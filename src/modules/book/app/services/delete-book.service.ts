import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IDeleteBookService } from '../../interfaces/services';
import { Book } from '../../domain/book.domain';

@Injectable()
export class DeleteBookService implements IDeleteBookService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(id: number): Promise<Book> {
    const oldBook = await this.prisma.book.delete({
      where: {
        id,
      },
    });
    return oldBook;
  }
}
