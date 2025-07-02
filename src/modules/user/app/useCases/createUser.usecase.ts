import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/user.entity';
import { TYPES } from '../../interfaces/types';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { FindUserByEmailService } from '../services/find-user-by-email.service';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(TYPES.services.CreateUserService)
    private userService: CreateUserService,
    @Inject(TYPES.services.FindUserByEmailService)
    private findUserService: FindUserByEmailService,
  ) {}
  async handle(data: CreateUserDTO): Promise<ResponseController<User>> {
    const emailExists = await this.findUserService.execute(data.email);
    if (emailExists) {
      throw new Error('Este e-mail já existe');
    }
    const newUser = await this.userService.execute(data);
    return {
      data: newUser,
      message: 'Usuário criado com sucesso',
    };
  }
}
