import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IFindUserEmailSubdomainService } from '../../interfaces/services';
import { User } from '../../domain/user.entity';

@Injectable()
export class FindUserEmailSubdomainService
  implements IFindUserEmailSubdomainService
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(subdomain: string): Promise<User[]> {
    const userSubdomain = await this.prisma.user.findMany({
      where: {
        email: {
          contains: `.${subdomain}`,
          mode: 'insensitive',
        },
      },
    });

    return userSubdomain;
  }
}
