import { Injectable } from '@nestjs/common';
import { ICreateUserService } from '../../interfaces/services';
import { User } from '../../domain/entity/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { CreateUserDTO } from '../../dto/create-user.dto';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserDTO): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return newUser;
  }
}
