import { Module, Provider } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDERTYPES } from './interfaces/types';
import { CreateNewOrderService } from './app/services/create-new-order.service';
import { CreateNewOrderUseCase } from './app/useCases/create-new-order.usecase';
import { DatabaseModule } from 'src/config/database/database.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { UpdateOrderStatus } from './app/services/update-order-status.service';
import { GetAllOrdersService } from './app/services/get-all-orders.service';
import { GetAllOrdersUseCase } from './app/useCases/get-all-orders.usecase';

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
    UpdateOrderStatus,
    GetAllOrdersService,
    GetAllOrdersUseCase,
  ],
})
export class OrderModule {}
