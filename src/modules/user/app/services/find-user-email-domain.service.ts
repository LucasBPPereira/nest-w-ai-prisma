import { Injectable } from '@nestjs/common';
import { IFindUserEmailDomainService } from '../../interfaces/services';
import { User } from '../../domain/entity/user.entity';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class FindUsersEmailDomainService
  implements IFindUserEmailDomainService
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(domain: string): Promise<User[]> {
    const userEmail = await this.prisma.user.findMany({
      where: {
        email: {
          contains: `@${domain}`,
          mode: 'insensitive',
        },
      },
    });
    return userEmail;
  }
}
