import { Injectable } from '@nestjs/common';
import { ICreateBookService } from '../../interfaces/services';
import { Book } from '../../domain/book.domain';
import { CreateBookDTO } from '../../dto/create-book.dto';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class CreateBookService implements ICreateBookService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(bookData: CreateBookDTO): Promise<Book> {
    const book = await this.prisma.book.create({
      data: bookData,
    });

    return book;
  }
}
