import { User } from '../../domain/entity/user.entity';

export interface IFindUserByEmailService {
  execute(email: string): Promise<User | null>;
}
