import { Injectable } from '@nestjs/common';
import { IGetCategoryByNameService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Category } from '../../domain/category';

@Injectable()
export class GetCategoryByNameService implements IGetCategoryByNameService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });
    return category;
  }
}
