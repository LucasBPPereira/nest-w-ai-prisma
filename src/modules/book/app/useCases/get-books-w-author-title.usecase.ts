import { Inject, Injectable } from '@nestjs/common';
import { QueryBookDTO } from '../../dto/query-book-controller.dto';
import { BOOKTYPES } from '../../interfaces/types';
import { GetBooksWithAuthorAndTitleService } from '../services/get-books-w-author-and-title.service';
import { GetBookByAuthorService } from '../services/get-book-by-author.service';
import { GetBookByTitleService } from '../services/get-book-by-title.service';
import { GetAllBooksService } from '../services/get-all-books.service';

@Injectable()
export class GetBooksWithAuthorTitleUseCase {
  constructor(
    @Inject(BOOKTYPES.services.GetBooksWithAuthorAndTitleService)
    private getBookWAuthorAndTitleS: GetBooksWithAuthorAndTitleService,
    @Inject(BOOKTYPES.services.GetBookByAuthorService)
    private getBookAuthorS: GetBookByAuthorService,
    @Inject(BOOKTYPES.services.GetBookByTitleService)
    private getBookTitleS: GetBookByTitleService,
    @Inject(BOOKTYPES.services.GetAllBooksService)
    private getAllBooksS: GetAllBooksService,
  ) {}
  public async handle(s: QueryBookDTO) {
    const { author, title } = s;

    if (author && title) {
      const booksAT = await this.getBookWAuthorAndTitleS.execute(author, title);
      return booksAT;
    }
    if (author && !title) {
      const booksA = await this.getBookAuthorS.execute(author);
      return booksA;
    }
    if (title && !author) {
      const booksT = await this.getBookTitleS.execute(title);
      return booksT;
    }

    const allBooks = await this.getAllBooksS.execute();
    return allBooks;
  }
}
