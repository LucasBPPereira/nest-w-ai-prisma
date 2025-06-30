import { Inject, Injectable } from '@nestjs/common';
import { IGetAllBooksUseCase } from '../../interfaces/useCases';
import { BOOKTYPES } from '../../interfaces/types';
import { GetAllBooksService } from '../services/get-all-books.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetAllBooksUseCase implements IGetAllBooksUseCase {
  constructor(
    @Inject(BOOKTYPES.services.GetAllBooksService)
    private getAllBooksS: GetAllBooksService,
  ) {}

  public async handle(): Promise<Book[] | []> {
    const books = await this.getAllBooksS.execute();
    return books;
  }
}
