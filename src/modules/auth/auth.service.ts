import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';
import { TYPES } from '../user/interfaces/types';
import { FindUserByEmailService } from '../user/app/services/find-user-by-email.service';
import * as bcrypt from 'bcrypt';
import { CreateUserService } from '../user/app/services/create-user.service';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from '../user/notification.service';
import { AiService } from 'src/config/ai/ai.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TYPES.services.FindUserByEmailService)
    private findUseByEmailS: FindUserByEmailService,
    @Inject(TYPES.services.CreateUserService)
    private createUserS: CreateUserService,
    private jwtService: JwtService,
    private notificationS: NotificationService,
    private iaService: AiService,
  ) {}
  public async signIn(data: AuthSignInDTO): Promise<any> {
    const { email, password } = data;
    const emailInUse = await this.findUseByEmailS.execute(email);

    if (!emailInUse) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(password, emailInUse.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    return await this.generateUserTokens(emailInUse.id);
  }
  public async signUp(data: AuthSignUpDTO): Promise<any> {
    const { confirmPassword, email, password } = data;

    const emailInUse = await this.findUseByEmailS.execute(email);
    if (emailInUse) {
      throw new BadRequestException('O e-mail já está em uso');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas precisam ser iguais');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.createUserS.execute({
      ...data,
      password: hashedPassword,
    });
    const iaText = await this.iaService.noficationNewUser(data.name);
    await this.notificationS.sendWelcomeEmail(newUser, iaText);
  }

  async generateUserTokens(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      { expiresIn: '1h' },
    );

    return {
      accessToken,
    };
  }
}
