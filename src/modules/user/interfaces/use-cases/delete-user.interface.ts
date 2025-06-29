import { User } from '../../domain/entity/user.entity';
import { ResponseController } from '../response-controller';

export interface IDeleteUserUseCase {
  handle(id: string): Promise<ResponseController<User>>;
}
