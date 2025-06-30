import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';

export interface ICreateBookUseCase {
  handle(bookData: CreateBookDTO): Promise<Book>;
}
