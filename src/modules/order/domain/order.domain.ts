import { $Enums, Order as PrismaOrder } from '@prisma/client';
// import { OrderItem } from './orderItem.domain';
// import { User } from 'src/modules/user/domain/entity/user.entity';

export interface Order extends PrismaOrder {
  id: number;
  userId: string;
  status: $Enums.OrderStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  //   orderItems: OrderItem[];
  //   user: User;
}
