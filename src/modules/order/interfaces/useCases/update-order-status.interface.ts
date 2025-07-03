import { $Enums } from '@prisma/client';
import { Order } from '../../domain/order.domain';

export interface IUpdateOrderStatusUseCase {
  handle(orderId: number, status: $Enums.OrderStatus): Promise<Order>;
}
