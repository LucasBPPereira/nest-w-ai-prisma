import { User } from '../../domain/user.entity';

export interface IFindUserByIDService {
  execute(id: string): Promise<User | null>;
}
