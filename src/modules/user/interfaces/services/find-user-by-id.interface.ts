import { User } from '../../domain/entity/user.entity';

export interface IFindUserByIDService {
  execute(id: string): Promise<User | null>;
}
