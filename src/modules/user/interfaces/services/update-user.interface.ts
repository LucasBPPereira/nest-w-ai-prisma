import { User } from '../../domain/user.entity';
import { UpdateUserDTO } from '../../dto/update-user.dto';

export interface IUpdateUserService {
  execute(id: string, userData: UpdateUserDTO): Promise<User>;
}
