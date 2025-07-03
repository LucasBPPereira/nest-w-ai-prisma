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
        id: true,
        email: true,
        password: true,
        updatedAt: true,
      },
      include: {
        orders: {
          omit: {
            userId: true,
            updatedAt: true,
          },
          include: {
            orderItems: {
              omit: {
                id: true,
              },
              include: {
                book: {
                  omit: {
                    id: true,
                    coverImageUrl: true,
                    reviewId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return userOrders[0];
  }
}
