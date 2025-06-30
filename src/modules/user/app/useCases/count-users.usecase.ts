import { Inject, Injectable } from '@nestjs/common';
import { ICountUsersUseCase } from '../../interfaces/use-cases';
import { TYPES } from '../../interfaces/types';
import { CountUsersService } from '../services/count-users.service';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class CountUsersUseCase implements ICountUsersUseCase {
  constructor(
    @Inject(TYPES.services.CountUsersService)
    private countUsersService: CountUsersService,
  ) {}
  public async handle(): Promise<ResponseController<number>> {
    const users = await this.countUsersService.execute();
    return {
      data: users,
      message: `A quantidade de usuários atuais é de: ${users}.`,
    };
  }
}
