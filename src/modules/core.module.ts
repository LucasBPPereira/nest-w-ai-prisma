import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';

@Module({ imports: [UserModule, BookModule, OrderModule, CategoryModule] })
export class CoreModule {}
