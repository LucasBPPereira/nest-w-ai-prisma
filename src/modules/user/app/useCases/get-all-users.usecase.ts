import { Inject, Injectable } from '@nestjs/common';
import { IGetAllUsersUseCase } from '../../interfaces/use-cases';
import { User } from '../../domain/entity/user.entity';
import { GetAllUsersService } from '../services/get-all-users.service';
import { TYPES } from '../../interfaces/types';

@Injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(
    @Inject(TYPES.services.GetAllUsersService)
    private userServiceGAU: GetAllUsersService,
  ) {}
  public async getAllUsers(): Promise<User[] | []> {
    return this.userServiceGAU.getAllUsers();
  }
}
