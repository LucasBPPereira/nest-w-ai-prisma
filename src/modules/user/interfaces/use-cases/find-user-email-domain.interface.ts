import { User } from '../../domain/entity/user.entity';
import { ResponseController } from '../response-controller';

export interface IFindUserEmailDomainUseCase {
  handle(domain: string): Promise<ResponseController<User[]>>;
}
