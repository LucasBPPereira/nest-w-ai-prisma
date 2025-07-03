import { Module, Provider } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDERTYPES } from './interfaces/types';
import { CreateNewOrderService } from './app/services/create-new-order.service';
import { CreateNewOrderUseCase } from './app/useCases/create-new-order.usecase';
import { DatabaseModule } from 'src/config/database/database.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { UpdateOrderStatusService } from './app/services/update-order-status.service';
import { GetAllOrdersService } from './app/services/get-all-orders.service';
import { GetAllOrdersUseCase } from './app/useCases/get-all-orders.usecase';
import { GetOrderByIDService } from './app/services/get-order-by-id.service';
import { UpdateOrderStatusUseCase } from './app/useCases/update-order-status.usecase';
import { GetOrderByIDUseCase } from './app/useCases/get-order-by-id.usecase';

const services: Provider[] = [
  {
    provide: ORDERTYPES.services.CreateNewOrderService,
    useClass: CreateNewOrderService,
  },
];

const useCases: Provider[] = [
  {
    provide: ORDERTYPES.useCases.CreateNewOrderUseCase,
    useClass: CreateNewOrderUseCase,
  },
];

@Module({
  imports: [DatabaseModule, UserModule, BookModule],
  controllers: [OrderController],
  providers: [
    ...services,
    ...useCases,
    UpdateOrderStatusService,
    UpdateOrderStatusUseCase,
    GetAllOrdersService,
    GetAllOrdersUseCase,
    GetOrderByIDService,
    GetOrderByIDUseCase,
  ],
})
export class OrderModule {}
