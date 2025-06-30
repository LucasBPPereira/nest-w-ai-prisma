import { Injectable } from '@nestjs/common';
import { ICreateManyUsersService } from '../../interfaces/services/create-many-users.interface';
import { User } from '../../domain/entity/user.entity';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class CreateManyUsersService implements ICreateManyUsersService {
  constructor(private readonly prisma: PrismaService) {}
  async execute(userData: CreateUserDTO[]): Promise<User[]> {
    const users = await this.prisma.user.createManyAndReturn({
      data: userData,
    });
    return users;
  }
}
