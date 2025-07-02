import { User } from '../../domain/user.entity';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { ResponseController } from '../response-controller';

export interface IUpdateUserUseCase {
  handle(
    id: string,
    userData: UpdateUserDTO,
  ): Promise<ResponseController<User>>;
}
