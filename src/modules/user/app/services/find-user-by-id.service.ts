import { Injectable } from '@nestjs/common';
import { IFindUserByIDService } from '../../interfaces/services';
import { User } from '../../domain/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class FindUserByIDService implements IFindUserByIDService {
  constructor(private prisma: PrismaService) {}
  async execute(id: string): Promise<User | null> {
    const userID = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return userID;
  }
}
