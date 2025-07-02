import { Injectable } from '@nestjs/common';
import { ICreateNewOrderService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Order } from '../../domain/order.domain';
import { CreateNewOrderDTO } from '../../dto/create-new-order.dto';

@Injectable()
export class CreateNewOrderService implements ICreateNewOrderService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateNewOrderDTO): Promise<Order> {
    const { orderItems, totalPrice, userId } = data;

    const orderTransaction = this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          totalPrice,
          orderItems: {
            create: orderItems.map((item) => ({
              bookId: item.bookId,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          orderItems: true,
          user: true,
        },
      });

      for (const item of orderItems) {
        await tx.book.update({
          where: {
            id: item.bookId,
          },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }
      return newOrder;
    });
    return orderTransaction;
  }
}
