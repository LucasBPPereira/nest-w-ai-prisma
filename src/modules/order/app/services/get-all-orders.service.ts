import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class GetAllOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute() {
    const orders = await this.prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });

    return orders;
  }
}
