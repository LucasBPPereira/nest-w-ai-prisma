import { User } from '../../domain/entity/user.entity';

export interface IFindUserEmailDomainService {
  execute(domain: string): Promise<User[]>;
}
