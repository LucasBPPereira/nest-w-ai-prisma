import { Injectable } from '@nestjs/common';
import { IFindUserByEmailService } from '../../interfaces/services';
import { User } from '../../domain/entity/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class FindUserByEmailService implements IFindUserByEmailService {
  constructor(private prisma: PrismaService) {}
  async findUserByEmail(email: string): Promise<User | null> {
    const userEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userEmail;
  }
}
