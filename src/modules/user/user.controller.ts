import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserUseCase } from './app/useCases/createUser.usecase';
import { TYPES } from './interfaces/types';
import { User } from './domain/entity/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetAllUsersUseCase } from './app/useCases/get-all-users.usecase';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    @Inject(TYPES.useCases.CreateUserUseCase)
    private createUserUC: CreateUserUseCase,
    @Inject(TYPES.useCases.GetAllUsersUseCase)
    private getAllUsersUC: GetAllUsersUseCase,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createUser(@Body() userData: CreateUserDTO): Promise<User> {
    const newUser = await this.createUserUC.createUser(userData);
    return newUser;
  }

  @Get('')
  public async getAllUsers(): Promise<User[] | []> {
    const users = await this.getAllUsersUC.getAllUsers();
    return users;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateUserByID(
    @Param('id') id: string,
    @Body() userData: UpdateUserDTO,
    @Res() res: Response,
  ) {
    const { email, name } = userData;
    if (!email && !name) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Os campos não podem estar vazios!' });
      return;
    }
  }
}
