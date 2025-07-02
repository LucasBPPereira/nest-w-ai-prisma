import { User } from '../../domain/user.entity';
import { ResponseController } from '../response-controller';

export interface IGetAllUsersUseCase {
  handle(): Promise<ResponseController<User[] | []>>;
}
