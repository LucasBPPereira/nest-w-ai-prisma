import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../interfaces/types';
import { FindUsersEmailDomainService } from '../services/find-user-email-domain.service';
import { IFindUserEmailDomainUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/user.entity';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class FindUsersEmailDomainUseCase
  implements IFindUserEmailDomainUseCase
{
  constructor(
    @Inject(TYPES.services.FindUserEmailDomainService)
    private findUserEmailDomainService: FindUsersEmailDomainService,
  ) {}
  public async handle(domain: string): Promise<ResponseController<User[]>> {
    const userEmail = await this.findUserEmailDomainService.execute(domain);
    return {
      data: userEmail,
      message: 'Domínio encontrado.',
    };
  }
}
