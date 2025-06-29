import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { TYPES } from '../../interfaces/types';
import { IUpdateUserUseCase } from '../../interfaces/use-cases';
import { FindUserByEmailService } from '../services/find-user-by-email.service';
import { FindUserByIDService } from '../services/find-user-by-id.service';
import { UpdateUserService } from '../services/update-user.service';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(TYPES.services.FindUserByEmailService)
    private findEmail: FindUserByEmailService,
    @Inject(TYPES.services.FindUserByIDService)
    private findID: FindUserByIDService,
    @Inject(TYPES.services.UpdateUserService)
    private update: UpdateUserService,
  ) {}
  async handle(
    id: string,
    userData: UpdateUserDTO,
  ): Promise<ResponseController<User>> {
    const idExists = await this.findID.execute(id);
    if (!idExists) {
      throw new Error('ID inválido!');
    }

    if (userData.email) {
      const emailExists = await this.findEmail.execute(userData.email);
      if (emailExists) {
        throw new Error('O e-mail já existe, insira outro.');
      }
    }

    const userUpdate = await this.update.execute(id, userData);

    return {
      data: userUpdate,
      message: 'Usuário atualizado!',
    };
  }
}
