import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindUserByIDService } from 'src/modules/user/app/services/find-user-by-id.service';
import { TYPES } from 'src/modules/user/interfaces/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(TYPES.services.FindUserByIDService)
    private findUserS: FindUserByIDService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('Payload recebido do JWT:', payload);
    const { userId } = payload as { userId: string };
    const user = await this.findUserS.execute(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
