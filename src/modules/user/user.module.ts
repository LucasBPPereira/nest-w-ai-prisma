import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { CreateUserService } from './app/services/create-user.service';
import { UserController } from './user.controller';
import { AiModule } from 'src/config/ai/ai.module';
import { TYPES } from './interfaces/types';
import { CreateUserUseCase } from './app/useCases/createUser.usecase';
import { FindUserByEmailService } from './app/services/find-user-by-email.service';
import { GetAllUsersService } from './app/services/get-all-users.service';
import { GetAllUsersUseCase } from './app/useCases/get-all-users.usecase';
import { UpdateUserService } from './app/services/update-user.service';
import { UpdateUserUseCase } from './app/useCases/update-user.usecase';
import { FindUserByIDService } from './app/services/find-user-by-id.service';
import { DeleteUserService } from './app/services/delete-user.service';
import { DeleteUserUseCase } from './app/useCases/delete-user.usecase';
import { NotificationService } from './notification.service';
import { BookModule } from '../book/book.module';
import { GetPurchaseHistoryOrder } from './app/services/get-purchase-history.service';
import { UserPreferencesService } from './user-preferences.service';

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
const findUserByIDService: Provider = {
  provide: TYPES.services.FindUserByIDService,
  useClass: FindUserByIDService,
};
const getAllUsersService: Provider = {
  provide: TYPES.services.GetAllUsersService,
  useClass: GetAllUsersService,
};
const getAllUsersUseCase: Provider = {
  provide: TYPES.useCases.GetAllUsersUseCase,
  useClass: GetAllUsersUseCase,
};

const updateUserService: Provider = {
  provide: TYPES.services.UpdateUserService,
  useClass: UpdateUserService,
};
const updateUserUseCase: Provider = {
  provide: TYPES.useCases.UpdateUserUseCase,
  useClass: UpdateUserUseCase,
};

const deleteUserService: Provider = {
  provide: TYPES.services.DeleteUserService,
  useClass: DeleteUserService,
};
const deleteUserUseCase: Provider = {
  provide: TYPES.useCases.DeleteUserUseCase,
  useClass: DeleteUserUseCase,
};

@Module({
  imports: [DatabaseModule, AiModule, BookModule],
  providers: [
    NotificationService,
    createUserService,
    createUserUseCase,
    findUserByEmailService,
    findUserByIDService,
    getAllUsersService,
    getAllUsersUseCase,
    updateUserService,
    updateUserUseCase,
    deleteUserService,
    deleteUserUseCase,
    GetPurchaseHistoryOrder,
    UserPreferencesService,
  ],
  controllers: [UserController],
  exports: [createUserService, findUserByEmailService, findUserByIDService],
})
export class UserModule {}
