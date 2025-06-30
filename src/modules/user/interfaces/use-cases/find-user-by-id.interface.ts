import { User } from '../../domain/entity/user.entity';
import { ResponseController } from '../response-controller';

export interface IFindUserByIDUseCase {
  handle(id: string): Promise<ResponseController<User>>;
}
