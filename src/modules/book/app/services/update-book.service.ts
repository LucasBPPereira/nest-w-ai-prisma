import { Injectable } from '@nestjs/common';
import { IUpdateBookService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';
import { UpdateBookDTO } from '../../dto/update-book.dto';

@Injectable()
export class UpdateBookService implements IUpdateBookService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(id: number, bookData: UpdateBookDTO): Promise<Book> {
    const bookUp = await this.prisma.book.update({
      where: { id },
      data: bookData,
    });

    return bookUp;
  }
}
