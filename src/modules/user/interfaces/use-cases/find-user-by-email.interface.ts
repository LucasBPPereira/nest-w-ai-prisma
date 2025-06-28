import { User } from '../../domain/entity/user.entity';

export interface IFindUserByEmailUseCase {
  findUserByEmail(email: string): Promise<User | null>;
}
