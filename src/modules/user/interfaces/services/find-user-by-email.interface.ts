import { User } from '../../domain/entity/user.entity';

export interface IFindUserByEmailService {
  findUserByEmail(email: string): Promise<User | null>;
}
