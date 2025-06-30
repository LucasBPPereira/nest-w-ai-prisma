import { User } from '../../domain/entity/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';

export interface ICreateManyUsersService {
  execute(userData: CreateUserDTO[]): Promise<User[]>;
}
