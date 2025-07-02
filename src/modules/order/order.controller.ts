import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ORDERTYPES } from './interfaces/types';
import { CreateNewOrderUseCase } from './app/useCases/create-new-order.usecase';
import { CreateNewOrderDTO } from './dto/create-new-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    @Inject(ORDERTYPES.useCases.CreateNewOrderUseCase)
    private createNewOrderUC: CreateNewOrderUseCase,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createNewOrder(@Body() orderData: CreateNewOrderDTO) {
    const order = await this.createNewOrderUC.handle(orderData);

    return {
      data: order,
      message:
        'Ordem de compra foi criada, o estado está pendente, pague para que o processo seja completado.',
    };
  }
}
