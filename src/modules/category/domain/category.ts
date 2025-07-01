import { Category as PrismaCategory } from '@prisma/client';
export class Category implements PrismaCategory {
  public readonly id: number;
  public readonly name: string;
}
