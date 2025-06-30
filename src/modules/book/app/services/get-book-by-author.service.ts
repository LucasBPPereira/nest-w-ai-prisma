import { Injectable } from '@nestjs/common';
import { IGetBookByAuthorService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetBookByAuthorService implements IGetBookByAuthorService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(author: string): Promise<Book | Book[] | null> {
    const books = await this.prisma.book.findMany({
      where: {
        author: {
          contains: author,
        },
      },
    });
    if (books.length === 1) {
      return books[0];
    }

    return books;
  }
}
