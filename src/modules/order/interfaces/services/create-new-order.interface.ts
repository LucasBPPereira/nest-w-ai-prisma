import { Order } from '../../domain/order.domain';
import { CreateNewOrderDTO } from '../../dto/create-new-order.dto';

export interface ICreateNewOrderService {
  execute(data: CreateNewOrderDTO): Promise<Order>;
}
