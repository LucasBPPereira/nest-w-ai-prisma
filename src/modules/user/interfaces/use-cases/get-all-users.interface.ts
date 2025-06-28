import { User } from '../../domain/entity/user.entity';

export interface IGetAllUsersUseCase {
  getAllUsers(): Promise<User[] | []>;
}
