import { Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateOrderStatusUseCase } from '../../interfaces/useCases/update-order-status.interface';
import { $Enums } from '@prisma/client';
import { Order } from '../../domain/order.domain';
import { GetOrderByIDService } from '../services/get-order-by-id.service';
import { UpdateOrderStatusService } from '../services/update-order-status.service';

@Injectable()
export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(
    private updateOrderStatusS: UpdateOrderStatusService,
    private getOrderByIDS: GetOrderByIDService,
  ) {}
  public async handle(
    orderId: number,
    status: $Enums.OrderStatus,
  ): Promise<Order> {
    const orderExists = await this.getOrderByIDS.execute(orderId);

    if (!orderExists) {
      throw new NotFoundException('Ordem de compra não encontrada');
    }

    const updatedOrder = await this.updateOrderStatusS.execute(
      orderExists.id,
      status,
    );

    return updatedOrder;
  }
}
