import { Injectable, NotFoundException } from '@nestjs/common';
import { IGetOrderByIDUseCase } from '../../interfaces/useCases';
import { Order } from '../../domain/order.domain';
import { GetOrderByIDService } from '../services/get-order-by-id.service';

@Injectable()
export class GetOrderByIDUseCase implements IGetOrderByIDUseCase {
  constructor(private getOrderByIDS: GetOrderByIDService) {}
  public async handle(id: number): Promise<Order> {
    const order = await this.getOrderByIDS.execute(id);

    if (!order) {
      throw new NotFoundException('Ordem de compra não encontrada');
    }

    return order;
  }
}
