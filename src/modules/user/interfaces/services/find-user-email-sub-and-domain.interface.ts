import { User } from '../../domain/user.entity';

export interface IFindUserEmailSubAndDomainService {
  execute(domain: string, subdomain: string, notIn?: boolean): Promise<User[]>;
}
