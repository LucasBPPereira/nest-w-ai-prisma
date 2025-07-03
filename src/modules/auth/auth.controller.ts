import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';
import { AuthRefreshTokenDTO } from './dto/auth-refresh-token.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() signUp: AuthSignUpDTO) {
    return await this.authService.signUp(signUp);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(
    @Body() signIn: AuthSignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(signIn);

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @Post('logout')
  async logout(@Body() userId: string) {
    return await this.authService.logout(userId);
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refreshToken(@Body() data: AuthRefreshTokenDTO) {
    const tokens = await this.authService.refreshUserToken(
      data.userId,
      data.refreshToken,
    );
    return tokens;
  }
}
