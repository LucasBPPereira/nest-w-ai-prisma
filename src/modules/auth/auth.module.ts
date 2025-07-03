import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';
import { NotificationService } from '../user/notification.service';
import { AiModule } from 'src/config/ai/ai.module';
import { AiService } from 'src/config/ai/ai.service';
import { GeminiService } from 'src/config/ai/gemini/gemini.service';
import { DatabaseModule } from 'src/config/database/database.module';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { FindUserByIDService } from '../user/app/services/find-user-by-id.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AiModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    NotificationService,
    AiService,
    GeminiService,
    PrismaService,
    FindUserByIDService,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
