import { Inject, Injectable } from '@nestjs/common';
import { IUpdateBookUseCase } from '../../interfaces/useCases';
import { BOOKTYPES } from '../../interfaces/types';
import { UpdateBookService } from '../services/update-book.service';
import { Book } from '../../domain/book.domain';
import { UpdateBookDTO } from '../../dto/update-book.dto';

@Injectable()
export class UpdateBookUseCase implements IUpdateBookUseCase {
  constructor(
    @Inject(BOOKTYPES.services.UpdateBookService)
    private updateBookS: UpdateBookService,
  ) {}

  public async handle(id: number, bookData: UpdateBookDTO): Promise<Book> {
    const bookUp = await this.updateBookS.execute(id, bookData);
    return bookUp;
  }
}
