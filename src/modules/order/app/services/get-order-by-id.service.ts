import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IGetOrderByIDService } from '../../interfaces/services';
import { Order } from '../../domain/order.domain';

@Injectable()
export class GetOrderByIDService implements IGetOrderByIDService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(id: number): Promise<Order | null> {
    const orderExists = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    return orderExists;
  }
}
