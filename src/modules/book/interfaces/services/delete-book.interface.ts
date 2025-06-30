import { Book } from '../../domain/book.domain';

export interface IDeleteBookService {
  execute(id: number): Promise<Book>;
}
