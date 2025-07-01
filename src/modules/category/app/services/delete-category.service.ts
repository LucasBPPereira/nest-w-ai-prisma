import { Injectable } from '@nestjs/common';
import { IDeleteCategoryService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Category } from '../../domain/category';

@Injectable()
export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(id: number): Promise<Category> {
    const deleteCategory = await this.prisma.category.delete({
      where: { id: Number(id) },
    });
    return deleteCategory;
  }
}
