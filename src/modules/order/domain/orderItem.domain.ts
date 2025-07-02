import { OrderItem as PrismaOrderItem } from '@prisma/client';
// import { Book } from 'src/modules/book/domain/book.domain';
// import { Order } from './order.domain';

// interface OrderItemConstructor extends PrismaOrderItem {
//   book: Book;
//   order: Order;
// }

export interface OrderItem extends PrismaOrderItem {
  id: number;
  bookId: number;
  orderId: number;
  price: number;
  quantity: number;
  //   book: Book;
  //   order: Order;
}
