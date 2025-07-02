import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindUserByEmailService } from 'src/modules/user/app/services/find-user-by-email.service';
import { TYPES } from 'src/modules/user/interfaces/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(TYPES.services.FindUserByEmailService)
    private findUserS: FindUserByEmailService,
  ) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: unknown) {
    const { email } = payload as { email: string };
    const user = await this.findUserS.execute(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
