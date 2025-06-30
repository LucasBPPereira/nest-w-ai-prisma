import { Injectable } from '@nestjs/common';
import { IGetAllBooksService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Book } from '../../domain/book.domain';

@Injectable()
export class GetAllBooksService implements IGetAllBooksService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(): Promise<Book[] | []> {
    const books = await this.prisma.book.findMany();
    return books;
  }
}
