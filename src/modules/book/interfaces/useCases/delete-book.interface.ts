import { Book } from '../../domain/book.domain';

export interface IDeleteBookUseCase {
  handle(id: number): Promise<Book>;
}
