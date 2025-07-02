import { Order } from '../../domain/order.domain';

export interface IGetAllOrdersService {
  execute(): Promise<Order[] | []>;
}
