import { User } from '../../domain/entity/user.entity';

export interface IGetAllUsersService {
  getAllUsers(): Promise<User[] | []>;
}
