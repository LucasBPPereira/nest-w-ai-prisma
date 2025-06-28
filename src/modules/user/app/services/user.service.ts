import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { User } from '../../domain/entity/user.entity';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;
  async createUser(
    userWhereUniqueInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    const { name, email } = userWhereUniqueInput;

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return newUser;
  }

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[] | []> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUserByID(id: string): Promise<User | null> {
    const userExists = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return userExists;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const emailExists = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return emailExists;
  }

  async findUserByName(user: {
    name: string;
    email?: string;
    id?: string;
  }): Promise<User | User[] | null> {
    const { name, email, id } = user;

    if (id) {
      return await this.findUserByID(id);
    }

    if (email) {
      return await this.findUserByEmail(email);
    }

    const usersName = await this.prisma.user.findMany({
      where: {
        name: name,
      },
    });

    if (usersName.length === 1) {
      return usersName[0];
    }

    return usersName;
  }
}
