import { Injectable } from '@nestjs/common';
import { ICreateManyBooksService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';

@Injectable()
export class CreateManyBooksService implements ICreateManyBooksService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(bookData: CreateBookDTO[]): Promise<Book[]> {
    const books = await this.prisma.book.createManyAndReturn({
      data: bookData,
    });
    return books;
  }
}
