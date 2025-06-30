import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { User } from '../../domain/entity/user.entity';
import { FindUsersByCreatedTimeDTO } from '../../dto/find-users-by-created-time.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUsersByCreatedTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(time: FindUsersByCreatedTimeDTO): Promise<User[]> {
    const { equal, gte, lte } = time;
    const user = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            createdAt: {
              gte: gte,
            },
          },
          {
            createdAt: {
              lte: lte,
            },
          },
          {
            createdAt: {
              equals: equal,
            },
          },
        ],
      },
    });

    return user;
  }
}
