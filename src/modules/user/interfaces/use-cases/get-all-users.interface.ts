import { User } from '../../domain/entity/user.entity';
import { ResponseController } from '../response-controller';

export interface IGetAllUsersUseCase {
  handle(): Promise<ResponseController<User[] | []>>;
}
