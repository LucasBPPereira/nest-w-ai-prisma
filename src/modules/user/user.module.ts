import { Module, Provider } from '@nestjs/common';
import { UserService } from './app/services/user.service';
import { DatabaseModule } from 'src/config/database/database.module';
import { CreateUserService } from './app/services/create-user.service';
import { UserController } from './user.controller';
import { AiModule } from 'src/config/ai/ai.module';
import { TYPES } from './interfaces/types';
import { CreateUserUseCase } from './app/useCases/createUser.usecase';
import { FindUserByEmailService } from './app/services/find-user-by-email.service';
import { GetAllUsersService } from './app/services/get-all-users.service';
import { GetAllUsersUseCase } from './app/useCases/get-all-users.usecase';

const createUserService: Provider = {
  provide: TYPES.services.CreateUserService,
  useClass: CreateUserService,
};
const createUserUseCase: Provider = {
  provide: TYPES.useCases.CreateUserUseCase,
  useClass: CreateUserUseCase,
};
const findUserByEmailService: Provider = {
  provide: TYPES.services.FindUserByEmailService,
  useClass: FindUserByEmailService,
};
const getAllUsersService: Provider = {
  provide: TYPES.services.GetAllUsersService,
  useClass: GetAllUsersService,
};
const getAllUsersUseCase: Provider = {
  provide: TYPES.useCases.GetAllUsersUseCase,
  useClass: GetAllUsersUseCase,
};

@Module({
  imports: [DatabaseModule, AiModule],
  providers: [
    UserService,
    createUserService,
    createUserUseCase,
    findUserByEmailService,
    getAllUsersService,
    getAllUsersUseCase,
  ],
  controllers: [UserController],
})
export class UserModule {}
