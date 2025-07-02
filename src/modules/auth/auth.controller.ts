/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-sign-in.dto';
import { AuthSignUpDTO } from './dto/auth-sign-up.dto';

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
  async signIn(@Body() signIn: AuthSignInDTO) {
    return await this.authService.signIn(signIn);
  }
}
