import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../interfaces/types';
import { FindUserByIDService } from '../services/find-user-by-id.service';
import { ResponseController } from '../../interfaces/response-controller';
import { User } from '@prisma/client';

@Injectable()
export class FindUserByIDUseCase {
  constructor(
    @Inject(TYPES.services.FindUserByIDService)
    private findUseByIDS: FindUserByIDService,
  ) {}

  public async handle(id: string): Promise<ResponseController<User>> {
    const user = await this.findUseByIDS.execute(id);
    if (!user) {
      throw new Error('Usuário não existe');
    }

    return {
      data: user,
      message: 'O usuário foi encontrado.',
    };
  }
}
