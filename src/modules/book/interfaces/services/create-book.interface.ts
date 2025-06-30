import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';

export interface ICreateBookService {
  execute(bookData: CreateBookDTO): Promise<Book>;
}
