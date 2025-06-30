import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { ICountUsersService } from '../../interfaces/services';

@Injectable()
export class CountUsersService implements ICountUsersService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(): Promise<number> {
    const users = await this.prisma.user.count();
    return users;
  }
}
