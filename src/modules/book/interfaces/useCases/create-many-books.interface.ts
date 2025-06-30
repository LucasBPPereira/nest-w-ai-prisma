import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';

export interface ICreateManyBooksUseCase {
  handle(bookData: CreateBookDTO[]): Promise<Book[]>;
}
