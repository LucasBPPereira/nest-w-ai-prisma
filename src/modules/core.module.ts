import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';

@Module({ imports: [UserModule, BookModule, OrderModule] })
export class CoreModule {}
