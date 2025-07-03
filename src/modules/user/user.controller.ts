import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserUseCase } from './app/useCases/createUser.usecase';
import { TYPES } from './interfaces/types';
import { User } from './domain/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetAllUsersUseCase } from './app/useCases/get-all-users.usecase';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Response } from 'express';
import { UpdateUserUseCase } from './app/useCases/update-user.usecase';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { DeleteUserUseCase } from './app/useCases/delete-user.usecase';
import { ResponseController } from './interfaces/response-controller';
import { GetPurchaseHistoryOrder } from './app/services/get-purchase-history.service';
import { UserPreferencesService } from './user-preferences.service';
import { GetPersonalizedRecommendationsService } from './app/services/get-personalized-recommendations.service';

@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UserController {
  constructor(
    @Inject(TYPES.useCases.CreateUserUseCase)
    private createUserUC: CreateUserUseCase,
    @Inject(TYPES.useCases.GetAllUsersUseCase)
    private getAllUsersUC: GetAllUsersUseCase,
    @Inject(TYPES.useCases.UpdateUserUseCase)
    private updateUserUC: UpdateUserUseCase,
    @Inject(TYPES.useCases.DeleteUserUseCase)
    private deleteUserUC: DeleteUserUseCase,
    private getPurchaseHistoryOrder: GetPurchaseHistoryOrder,
    private userPreferencesS: UserPreferencesService,
    private getBookRecommendationS: GetPersonalizedRecommendationsService,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createUser(
    @Body() userData: CreateUserDTO,
  ): Promise<ResponseController<User>> {
    const newUser = await this.createUserUC.handle(userData);
    return newUser;
  }

  @Post(':id/preferences')
  public async createUserPreference(
    @Param('id') userId: string,
    @Body() categories: { categoriesId: number[] },
  ) {
    const userPrefereces = await this.userPreferencesS.saveManyUserPreferences(
      userId,
      categories,
    );

    return userPrefereces;
  }

  @Get('')
  public async getAllUsers(): Promise<ResponseController<User[] | []>> {
    const users = await this.getAllUsersUC.handle();
    console.log('a requisição veio');
    return users;
  }

  @Get(':id/orders')
  public async getPurchasehistory(@Param('id') id: string) {
    const userOrders = await this.getPurchaseHistoryOrder.execute(id);
    const userPreferences = await this.userPreferencesS.getUserPreferences(id);
    return {
      data: userOrders,
      preferences: userPreferences,
    };
  }

  @Get(':id/bookRecommendation')
  public async getBookRecommendation(@Param('id') id: string) {
    const recommendation = await this.getBookRecommendationS.execute(id);
    return recommendation;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateUserByID(
    @Param('id') id: string,
    @Body() userData: UpdateUserDTO,
    @Res() res: Response,
  ) {
    const start = process.hrtime();
    try {
      if (!id) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'ID não foi enviado!' });
        return;
      }
      const { email, name } = userData;
      if (!email && !name) {
        const [sec, nano] = process.hrtime(start);
        const timeSec = (sec * 1000 + nano / 1e6).toFixed(2);
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Os campos não podem estar vazios!',
          time: `${timeSec}ms`,
        });
        return;
      }

      const userUpdate = await this.updateUserUC.handle(id, userData);
      const { data, message } = userUpdate;
      const [sec, nano] = process.hrtime(start);
      const timeSec = (sec * 1000 + nano / 1e6).toFixed(2);
      res.status(HttpStatus.OK).json({
        data,
        message,
        success: true,
        time: `${timeSec}ms`,
      });
      return;
    } catch (error) {
      const [sec, nano] = process.hrtime(start);
      const timeSec = (sec * 1000 + nano / 1e6).toFixed(2);

      res.status(500).json({
        message: 'Houve um erro no servidor. ' + error,
        success: false,
        time: `${timeSec}ms`,
      });
      return;
    }
  }

  @Delete(':id')
  public async deleteUserByID(@Param('id') id: string) {
    const userDeleted = await this.deleteUserUC.handle(id);
    return userDeleted;
  }
}
