import { Book } from '../../domain/book.domain';

export interface IGetBookByTitleUseCase {
  handle(title: string): Promise<Book>;
}
