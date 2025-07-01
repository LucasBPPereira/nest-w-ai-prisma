import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { IUpdateCategoryService } from '../../interfaces/services';
import { Category } from '../../domain/category';
import { UpdateCategoryDTO } from '../../dto/update-category.dto';

@Injectable()
export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(
    id: number,
    categoryData: UpdateCategoryDTO,
  ): Promise<Category> {
    const updatedCategory = await this.prisma.category.update({
      where: {
        id: Number(id),
      },
      data: categoryData,
    });
    return updatedCategory;
  }
}
