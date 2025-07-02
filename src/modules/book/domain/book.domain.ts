import { Book as PrismaBook } from '@prisma/client';
// import { Category } from 'src/modules/category/domain/category';
// import { OrderItem } from 'src/modules/order/domain/orderItem.domain';

export interface Book extends PrismaBook {
  id: number;
  title: string;
  author: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  publicationDate: Date;
  coverImageUrl: string | null;
  categoryId: number;
  // category: Category;
  // orderItems: OrderItem[];
}
