import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
