import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
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
import { AuthTokenPayload } from './interfaces/auth-token-payload.interface';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { FindUserByIDService } from '../user/app/services/find-user-by-id.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(TYPES.services.FindUserByEmailService)
    private readonly findUseByEmailS: FindUserByEmailService,
    @Inject(TYPES.services.CreateUserService)
    private readonly createUserS: CreateUserService,
    @Inject(TYPES.services.FindUserByIDService)
    private readonly findUserByIDService: FindUserByIDService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}
  public async signIn(data: AuthSignInDTO): Promise<AuthTokenPayload> {
    const { email, password } = data;
    const emailInUse = await this.findUseByEmailS.execute(email);

    if (!emailInUse) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(password, emailInUse.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const { accessToken, refreshToken } = await this.generateUserTokens(
      emailInUse.id,
    );

    await this.updateUserToken(emailInUse.id, refreshToken);
    return {
      accessToken,
    };
  }
  public async signUp(data: AuthSignUpDTO): Promise<AuthTokenPayload> {
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
    let welcomeMessage: string | null = null;
    try {
      welcomeMessage = await this.aiService.noficationNewUser(data.name);
      await this.notificationService.sendWelcomeEmail(newUser, welcomeMessage);
    } catch (err) {
      this.logger.warn('Falha ao gerar ou enviar mensagem da IA', err);
    }

    const { accessToken, refreshToken } = await this.generateUserTokens(
      newUser.id,
    );

    await this.updateUserToken(newUser.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async logout(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }

  async generateUserTokens(userId: string) {
    const payload = { userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateUserToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRT = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: hashedRT,
      },
    });
  }
  public async refreshUserToken(userId: string, refreshToken: string) {
    const user = await this.findUserByIDService.execute(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateUserTokens(user.id);
    await this.updateUserToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
