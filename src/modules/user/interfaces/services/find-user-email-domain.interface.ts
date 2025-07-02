import { User } from '../../domain/user.entity';

export interface IFindUserEmailDomainService {
  execute(domain: string): Promise<User[]>;
}
