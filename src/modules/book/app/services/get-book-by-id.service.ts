import { Injectable } from '@nestjs/common';
import { IGetBookByIDService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetBookByIDService implements IGetBookByIDService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });
    return book;
  }
}
