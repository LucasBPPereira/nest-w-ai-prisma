import { User } from '../../domain/user.entity';

export interface IDeleteUserService {
  execute(id: string): Promise<User>;
}
