import { User } from '../../domain/user.entity';

export interface IFindUserEmailSubdomainService {
  execute(subdomain: string): Promise<User[]>;
}
