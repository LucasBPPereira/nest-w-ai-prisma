import { User } from '../../domain/entity/user.entity';
import { FindUsersByCreatedTimeDTO } from '../../dto/find-users-by-created-time.dto';

export interface IFindUsersByCreatedTimeService {
  execute(time: FindUsersByCreatedTimeDTO): Promise<User[]>;
}
