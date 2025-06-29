import { User } from '../../domain/entity/user.entity';
import { UpdateUserDTO } from '../../dto/update-user.dto';

export interface IUpdateUserService {
  execute(id: string, userData: UpdateUserDTO): Promise<User>;
}
