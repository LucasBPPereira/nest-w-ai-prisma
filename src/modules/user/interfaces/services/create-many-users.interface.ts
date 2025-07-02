import { User } from '../../domain/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';

export interface ICreateManyUsersService {
  execute(userData: CreateUserDTO[]): Promise<User[]>;
}
