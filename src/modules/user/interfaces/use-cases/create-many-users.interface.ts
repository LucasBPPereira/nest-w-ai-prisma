import { User } from '../../domain/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { ResponseController } from '../response-controller';

export interface ICreateManyUsersUseCase {
  handle(userData: CreateUserDTO[]): Promise<ResponseController<User[]>>;
}
