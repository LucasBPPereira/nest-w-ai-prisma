import { User } from '../../domain/entity/user.entity';

export interface ICreateUserUseCase {
  createUser(data: User): Promise<User>;
}
