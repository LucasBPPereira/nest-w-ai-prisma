import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/entity/user.entity';
import { TYPES } from '../../interfaces/types';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { FindUserByEmailService } from '../services/find-user-by-email.service';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(TYPES.services.CreateUserService)
    private userService: CreateUserService,
    @Inject(TYPES.services.FindUserByEmailService)
    private findUserService: FindUserByEmailService,
  ) {}
  async createUser(data: CreateUserDTO): Promise<User> {
    const emailExists = await this.findUserService.findUserByEmail(data.email);
    if (emailExists) {
      throw new Error('Este e-mail já existe');
    }
    return this.userService.createUser(data);
  }
}
