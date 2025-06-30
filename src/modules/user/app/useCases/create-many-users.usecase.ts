import { Inject, Injectable } from '@nestjs/common';
import { ICreateManyUsersUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/entity/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { ResponseController } from '../../interfaces/response-controller';
import { TYPES } from '../../interfaces/types';
import { CreateManyUsersService } from '../services/create-many-users.service';

@Injectable()
export class CreateManyUsersUseCase implements ICreateManyUsersUseCase {
  constructor(
    @Inject(TYPES.services.CreateManyUsersService)
    private createManyUsersService: CreateManyUsersService,
  ) {}
  public async handle(
    userData: CreateUserDTO[],
  ): Promise<ResponseController<User[]>> {
    const users = await this.createManyUsersService.execute(userData);
    return {
      data: users,
      message: 'Usuários criados com sucesso.',
    };
  }
}
