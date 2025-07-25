import { Injectable } from '@nestjs/common';
import { IFindUserByEmailService } from '../../interfaces/services';
import { User } from '../../domain/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class FindUserByEmailService implements IFindUserByEmailService {
  constructor(private prisma: PrismaService) {}
  async execute(email: string): Promise<User | null> {
    const userEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userEmail;
  }
}
