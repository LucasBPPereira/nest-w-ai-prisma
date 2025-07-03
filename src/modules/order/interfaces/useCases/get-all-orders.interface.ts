import { Order } from '../../domain/order.domain';

export interface IGetAllOrdersDUseCase {
  handle(id: number): Promise<Order[] | []>;
}
