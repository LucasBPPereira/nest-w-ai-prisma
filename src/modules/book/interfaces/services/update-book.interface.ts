import { Book } from '../../domain/book.domain';
import { UpdateBookDTO } from '../../dto/update-book.dto';

export interface IUpdateBookService {
  execute(id: number, bookData: UpdateBookDTO): Promise<Book>;
}
