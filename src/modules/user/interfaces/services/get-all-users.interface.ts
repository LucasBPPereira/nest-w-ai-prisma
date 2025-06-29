import { User } from '../../domain/entity/user.entity';

export interface IGetAllUsersService {
  execute(): Promise<User[] | []>;
}
