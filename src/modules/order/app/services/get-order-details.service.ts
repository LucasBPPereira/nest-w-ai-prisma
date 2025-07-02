import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class GetOrderDetails {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            book: true,
          },
        },
      },
    });
    return order;
  }
}
