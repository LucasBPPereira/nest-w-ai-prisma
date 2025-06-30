import { Book as PrismaBook } from '@prisma/client';
export class Book implements PrismaBook {
  id: number;
  title: string;
  author: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  publicationDate: Date;
  coverImageUrl: string | null;
  categoryId: number;
}
