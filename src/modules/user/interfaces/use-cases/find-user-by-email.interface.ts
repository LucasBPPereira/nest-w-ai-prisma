import { User } from '../../domain/user.entity';

export interface IFindUserByEmailUseCase {
  handle(email: string): Promise<User | null>;
}
