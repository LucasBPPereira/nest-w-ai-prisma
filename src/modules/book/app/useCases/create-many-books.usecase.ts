import { Inject, Injectable } from '@nestjs/common';
import { ICreateManyBooksUseCase } from '../../interfaces/useCases';
import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';
import { BOOKTYPES } from '../../interfaces/types';
import { CreateManyBooksService } from '../services/create-many-books.service';

@Injectable()
export class CreateManyBooksUseCase implements ICreateManyBooksUseCase {
  constructor(
    @Inject(BOOKTYPES.services.CreateManyBooksService)
    private createManyBooksS: CreateManyBooksService,
  ) {}
  public async handle(bookData: CreateBookDTO[]): Promise<Book[]> {
    const books = await this.createManyBooksS.execute(bookData);
    return books;
  }
}
