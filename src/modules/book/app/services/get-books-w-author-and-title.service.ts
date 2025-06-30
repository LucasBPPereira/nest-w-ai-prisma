import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IGetBooksWithAuthorAndTitleService } from '../../interfaces/services';

@Injectable()
export class GetBooksWithAuthorAndTitleService
  implements IGetBooksWithAuthorAndTitleService
{
  constructor(private readonly prisma: PrismaService) {}

  public async execute(author: string, title: string) {
    const books = await this.prisma.book.findMany({
      where: {
        AND: [
          {
            author: {
              contains: author,
            },
          },
          {
            title: {
              contains: title,
            },
          },
        ],
      },
    });

    if (books.length === 1) {
      return books[0];
    }

    return books;
  }
}
