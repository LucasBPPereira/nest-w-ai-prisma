import { User } from '../../domain/entity/user.entity';

export interface IDeleteUserService {
  execute(id: string): Promise<User>;
}
