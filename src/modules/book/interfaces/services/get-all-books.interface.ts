import { Book } from '../../domain/book.domain';

export interface IGetAllBooksService {
  execute(): Promise<Book[] | []>;
}
