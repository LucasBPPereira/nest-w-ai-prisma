import { Book } from '../../domain/book.domain';

export interface IGetBookByIDUseCase {
  handle(id: number): Promise<Book>;
}
