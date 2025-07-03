import { Order } from '../../domain/order.domain';

export interface IGetOrderByIDUseCase {
  handle(id: number): Promise<Order>;
}
