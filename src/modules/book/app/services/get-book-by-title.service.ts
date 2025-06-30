import { Injectable } from '@nestjs/common';
import { IGetBookByTitleService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetBookByTitleService implements IGetBookByTitleService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(title: string): Promise<Book | Book[] | null> {
    const books = await this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    if (books.length === 1) {
      return books[0];
    }

    return books;
  }
}
