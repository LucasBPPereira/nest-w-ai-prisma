import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { User } from '../../domain/user.entity';
import { UpdateUserDTO } from '../../dto/update-user.dto';
import { IUpdateUserService } from '../../interfaces/services';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(private prisma: PrismaService) {}
  async execute(id: string, userData: UpdateUserDTO): Promise<User> {
    console.log(userData);
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });
    return updateUser;
  }
}
