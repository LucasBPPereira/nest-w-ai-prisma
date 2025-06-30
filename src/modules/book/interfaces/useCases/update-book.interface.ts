import { Book } from '../../domain/book.domain';
import { UpdateBookDTO } from '../../dto/update-book.dto';

export interface IUpdateBookUseCase {
  handle(id: number, bookData: UpdateBookDTO): Promise<Book>;
}
