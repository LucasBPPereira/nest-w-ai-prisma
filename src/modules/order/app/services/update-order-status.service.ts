import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IUpdateOrderStatusService } from '../../interfaces/services';

@Injectable()
export class UpdateOrderStatusService implements IUpdateOrderStatusService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(orderId: number, newStatus: $Enums.OrderStatus) {
    const updatedOrder = await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: newStatus,
      },
    });
    return updatedOrder;
  }
}
