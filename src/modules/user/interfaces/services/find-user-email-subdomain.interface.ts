import { User } from '../../domain/entity/user.entity';

export interface IFindUserEmailSubdomainService {
  execute(subdomain: string): Promise<User[]>;
}
