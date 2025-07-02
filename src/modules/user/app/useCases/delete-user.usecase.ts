import { Inject, Injectable } from '@nestjs/common';
import { IDeleteUserUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/user.entity';
import { TYPES } from '../../interfaces/types';
import { DeleteUserService } from '../services/delete-user.service';
import { FindUserByIDService } from '../services/find-user-by-id.service';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject(TYPES.services.DeleteUserService)
    private deleteUserService: DeleteUserService,
    @Inject(TYPES.services.FindUserByIDService)
    private findUserByID: FindUserByIDService,
  ) {}
  async handle(id: string): Promise<ResponseController<User>> {
    const userExists = await this.findUserByID.execute(id);

    if (!userExists) {
      throw new Error('O usuário não existe!');
    }

    const userDeleted = await this.deleteUserService.execute(id);
    return {
      data: userDeleted,
      message: 'Usuário deletado com sucesso',
    };
  }
}
