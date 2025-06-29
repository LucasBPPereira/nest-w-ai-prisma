import { User } from '../../domain/entity/user.entity';

export interface IFindUserByEmailUseCase {
  handle(email: string): Promise<User | null>;
}
