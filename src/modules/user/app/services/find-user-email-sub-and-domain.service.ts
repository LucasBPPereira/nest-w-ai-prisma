import { Injectable } from '@nestjs/common';
import { IFindUserEmailSubAndDomainService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { User } from '../../domain/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindUserEmailSubAndDomain
  implements IFindUserEmailSubAndDomainService
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(
    domain: string,
    subdomain: string,
    notIn?: boolean,
  ): Promise<User[]> {
    const notFilters: Prisma.UserWhereInput[] = [];
    const andFilters: Prisma.UserWhereInput[] = [];
    if (notIn) {
      notFilters.push(
        {
          email: {
            contains: `@${domain}`,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: `.${subdomain}`,
            mode: 'insensitive',
          },
        },
      );
    } else {
      andFilters.push(
        {
          email: {
            contains: `@${domain}`,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: `.${subdomain}`,
            mode: 'insensitive',
          },
        },
      );
    }
    const userEmail = await this.prisma.user.findMany({
      where: notIn ? { NOT: notFilters } : { AND: andFilters },
    });
    return userEmail;
  }
}
