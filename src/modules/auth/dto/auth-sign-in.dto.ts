import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
