import { User } from '../../domain/user.entity';
import { FindUsersByCreatedTimeDTO } from '../../dto/find-users-by-created-time.dto';

export interface IFindUsersByCreatedTimeService {
  execute(time: FindUsersByCreatedTimeDTO): Promise<User[]>;
}
