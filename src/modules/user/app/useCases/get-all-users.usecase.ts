import { Inject, Injectable } from '@nestjs/common';
import { IGetAllUsersUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/user.entity';
import { GetAllUsersService } from '../services/get-all-users.service';
import { TYPES } from '../../interfaces/types';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @Inject(TYPES.services.GetAllUsersService)
    private userServiceGAU: GetAllUsersService,
  ) {}
  public async handle(): Promise<ResponseController<User[] | []>> {
    const users = await this.userServiceGAU.execute();
    return {
      data: users,
      message:
        users.length === 1
          ? 'Usuário retornado.'
          : users.length > 1
            ? 'Usuários retornados.'
            : 'Nenhum usuário foi retornado.',
    };
  }
}
