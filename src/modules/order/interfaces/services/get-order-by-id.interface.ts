import { Order } from '../../domain/order.domain';

export interface IGetOrderByIDService {
  execute(id: number): Promise<Order | null>;
}
