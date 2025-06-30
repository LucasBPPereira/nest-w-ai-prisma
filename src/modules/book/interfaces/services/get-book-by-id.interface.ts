import { Book } from '../../domain/book.domain';

export interface IGetBookByIDService {
  execute(id: number): Promise<Book | null>;
}
