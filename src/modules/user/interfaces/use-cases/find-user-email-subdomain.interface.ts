import { User } from '../../domain/entity/user.entity';
import { ResponseController } from '../response-controller';

export interface IFindUserEmailSubdomainUseCase {
  handle(subdomain: string): Promise<ResponseController<User[]>>;
}
