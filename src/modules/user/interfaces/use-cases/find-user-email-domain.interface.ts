import { User } from '../../domain/user.entity';
import { ResponseController } from '../response-controller';

export interface IFindUserEmailDomainUseCase {
  handle(domain: string): Promise<ResponseController<User[]>>;
}
