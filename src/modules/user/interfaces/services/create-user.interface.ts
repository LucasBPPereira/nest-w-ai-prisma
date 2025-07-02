import { User } from '../../domain/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';

export interface ICreateUserService {
  execute(data: CreateUserDTO): Promise<User>;
}
