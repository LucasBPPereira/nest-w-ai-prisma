import { Book } from '../../domain/book.domain';

export interface IGetBookByAuthorService {
  execute(author: string): Promise<Book | Book[] | null>;
}
