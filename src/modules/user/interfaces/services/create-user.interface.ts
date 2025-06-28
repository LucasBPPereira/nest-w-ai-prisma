import { User } from '../../domain/entity/user.entity';

export interface ICreateUserService {
  createUser(data: User): Promise<User>;
}
