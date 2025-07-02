import { User } from '../../domain/user.entity';
import { ResponseController } from '../response-controller';

export interface IFindUserEmailSubdomainUseCase {
  handle(subdomain: string): Promise<ResponseController<User[]>>;
}
