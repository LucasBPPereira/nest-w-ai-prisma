import { Injectable } from '@nestjs/common';
import { IGetAllUsersService } from '../../interfaces/services';
import { User } from '../../domain/entity/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class GetAllUsersService implements IGetAllUsersService {
  constructor(private prisma: PrismaService) {}
  async execute(): Promise<User[] | []> {
    const users = await this.prisma.user.findMany();
    if (!users) {
      return [];
    }
    return users;
  }
}
