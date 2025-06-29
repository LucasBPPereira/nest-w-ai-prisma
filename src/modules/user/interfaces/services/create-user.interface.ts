import { User } from '../../domain/entity/user.entity';

export interface ICreateUserService {
  execute(data: User): Promise<User>;
}
