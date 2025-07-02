import { Order } from '../../domain/order.domain';
import { CreateNewOrderDTO } from '../../dto/create-new-order.dto';

export interface ICreateNewOrderUseCase {
  handle(data: CreateNewOrderDTO): Promise<Order>;
}
