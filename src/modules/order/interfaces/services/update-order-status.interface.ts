import { $Enums } from '@prisma/client';
import { Order } from '../../domain/order.domain';

export interface IUpdateOrderStatusService {
  execute(orderId: number, status: $Enums.OrderStatus): Promise<Order>;
}
