import { Book } from '../../domain/book.domain';

export interface IGetBooksWithAuthorAndTitleService {
  execute(author: string, title: string): Promise<Book | Book[] | []>;
}
