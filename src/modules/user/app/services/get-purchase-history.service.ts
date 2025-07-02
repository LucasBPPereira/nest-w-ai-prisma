import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class GetPurchaseHistoryOrder {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(userId: string) {
    const userOrders = await this.prisma.user.findMany({
      where: {
        id: userId,
      },
      omit: {
        createdAt: true,
        email: true,
        password: true,
        updatedAt: true,
      },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                book: true,
              },
            },
          },
        },
      },
    });
    return userOrders;
  }
}
