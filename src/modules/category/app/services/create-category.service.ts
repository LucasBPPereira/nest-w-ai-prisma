import { Injectable } from '@nestjs/common';
import { ICreateCategoryService } from '../../interfaces/services';
import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(categoryData: CreateCategoryDTO): Promise<Category> {
    const newCategory = await this.prisma.category.create({
      data: categoryData,
    });
    return newCategory;
  }
}
