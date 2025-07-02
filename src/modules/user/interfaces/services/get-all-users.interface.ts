import { User } from '../../domain/user.entity';

export interface IGetAllUsersService {
  execute(): Promise<User[] | []>;
}
