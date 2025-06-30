import { Book } from '../../domain/book.domain';

export interface IGetAllBooksUseCase {
  handle(): Promise<Book[] | []>;
}
