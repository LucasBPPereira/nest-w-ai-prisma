import { Inject, Injectable } from '@nestjs/common';
import { ICreateBookUseCase } from '../../interfaces/useCases';
import { BOOKTYPES } from '../../interfaces/types';
import { CreateBookService } from '../services/create-book.service';
import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';

@Injectable()
export class CreateBookUseCase implements ICreateBookUseCase {
  constructor(
    @Inject(BOOKTYPES.services.CreateBookService)
    private createBookS: CreateBookService,
  ) {}
  public async handle(bookData: CreateBookDTO): Promise<Book> {
    const time = new Date(bookData.publicationDate).toISOString();
    const book = await this.createBookS.execute({
      ...bookData,
      publicationDate: time,
    });
    return book;
  }
}
