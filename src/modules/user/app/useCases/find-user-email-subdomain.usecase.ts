import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../../interfaces/types';
import { FindUserEmailSubdomainService } from '../services/find-user-email-subdomain.service';
import { IFindUserEmailSubdomainUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/user.entity';
import { ResponseController } from '../../interfaces/response-controller';

@Injectable()
export class FindUserEmailSubdomainUseCase
  implements IFindUserEmailSubdomainUseCase
{
  constructor(
    @Inject(TYPES.services.FindUserEmailSubdomainService)
    private findUserEmailSubdomainS: FindUserEmailSubdomainService,
  ) {}

  public async handle(subdomain: string): Promise<ResponseController<User[]>> {
    const userSubdomain = await this.findUserEmailSubdomainS.execute(subdomain);
    return {
      data: userSubdomain,
      message: 'Subdomínio foi encontrado.',
    };
  }
}
