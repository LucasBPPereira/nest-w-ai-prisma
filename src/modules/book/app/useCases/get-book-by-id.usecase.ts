import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGetBookByIDUseCase } from '../../interfaces/useCases';
import { BOOKTYPES } from '../../interfaces/types';
import { GetBookByIDService } from '../services/get-book-by-id.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetBookByIDUseCase implements IGetBookByIDUseCase {
  constructor(
    @Inject(BOOKTYPES.services.GetBookByIDService)
    private getBookByIDS: GetBookByIDService,
  ) {}

  public async handle(id: number): Promise<Book> {
    const book = await this.getBookByIDS.execute(id);
    if (!book) {
      throw new NotFoundException('O ID do Livro não foi encontrado');
    }
    return book;
  }
}
