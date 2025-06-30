import { Book } from '../../domain/book.domain';

export interface IGetBookByAuthorUseCase {
  handle(author: string): Promise<Book>;
}
