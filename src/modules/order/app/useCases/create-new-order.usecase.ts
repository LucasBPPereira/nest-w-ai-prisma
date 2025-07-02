import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewOrderDTO } from '../../dto/create-new-order.dto';
import { TYPES } from 'src/modules/user/interfaces/types';
import { FindUserByIDService } from 'src/modules/user/app/services/find-user-by-id.service';
import { BOOKTYPES } from 'src/modules/book/interfaces/types';
import { GetBookByIDService } from 'src/modules/book/app/services/get-book-by-id.service';
import { ICreateNewOrderUseCase } from '../../interfaces/useCases';
import { Order } from '../../domain/order.domain';
import { ORDERTYPES } from '../../interfaces/types';
import { CreateNewOrderService } from '../services/create-new-order.service';

@Injectable()
export class CreateNewOrderUseCase implements ICreateNewOrderUseCase {
  constructor(
    @Inject(TYPES.services.FindUserByIDService)
    private findUserByIDS: FindUserByIDService,
    @Inject(BOOKTYPES.services.GetBookByIDService)
    private getBookByIDS: GetBookByIDService,
    @Inject(ORDERTYPES.services.CreateNewOrderService)
    private createNewOrderS: CreateNewOrderService,
  ) {}
  public async handle(data: CreateNewOrderDTO): Promise<Order> {
    const { userId, orderItems, totalPrice } = data;

    if (totalPrice < 100) {
      throw new BadRequestException('Valor inválido');
    }
    const userExists = await this.findUserByIDS.execute(userId);
    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }
    let priceIsCorret = 0;
    for (const item of orderItems) {
      const bookExists = await this.getBookByIDS.execute(item.bookId);
      if (!bookExists) {
        throw new NotFoundException(
          'O livro não foi encontrado, insira outro!',
        );
      }

      if (bookExists.stockQuantity < item.quantity) {
        throw new BadRequestException(
          'A quantidade informada é maior do que a do estoque!',
        );
      }

      if (item.quantity === 0) {
        throw new BadRequestException('Quantidade inválida');
      }

      if (item.price < 100) {
        throw new BadRequestException('Valor não permitido');
      }

      priceIsCorret += item.price * item.quantity;
    }

    if (totalPrice !== priceIsCorret) {
      console.log(totalPrice);
      console.log(priceIsCorret);
      throw new ConflictException('Valor incorreto');
    }

    const newOrder = await this.createNewOrderS.execute(data);
    return newOrder;
  }
}
