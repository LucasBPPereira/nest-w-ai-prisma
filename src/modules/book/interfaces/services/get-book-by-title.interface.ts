import { Book } from '../../domain/book.domain';

export interface IGetBookByTitleService {
  execute(title: string): Promise<Book | Book[] | null>;
}
