import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteBookUseCase } from '../../interfaces/useCases';
import { Book } from '../../domain/book.domain';
import { BOOKTYPES } from '../../interfaces/types';
import { DeleteBookService } from '../services/delete-book.service';
import { GetBookByIDService } from '../services/get-book-by-id.service';

@Injectable()
export class DeleteBookUseCase implements IDeleteBookUseCase {
  constructor(
    @Inject(BOOKTYPES.services.DeleteBookService)
    private deleteBookService: DeleteBookService,

    @Inject(BOOKTYPES.services.GetBookByIDService)
    private getBookIDS: GetBookByIDService,
  ) {}
  public async handle(id: number): Promise<Book> {
    const bookExists = await this.getBookIDS.execute(id);

    if (!bookExists) {
      throw new NotFoundException('O ID do livro não foi encontrado!');
    }

    const oldBook = await this.deleteBookService.execute(id);
    return oldBook;
  }
}
