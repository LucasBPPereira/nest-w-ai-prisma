import { User } from '../../domain/user.entity';

export interface IFindUserByEmailService {
  execute(email: string): Promise<User | null>;
}
