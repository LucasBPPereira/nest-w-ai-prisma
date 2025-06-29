import { Injectable } from '@nestjs/common';
import { IDeleteUserService } from '../../interfaces/services';
import { User } from '../../domain/entity/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class DeleteUserService implements IDeleteUserService {
  constructor(private prisma: PrismaService) {}
  async execute(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
