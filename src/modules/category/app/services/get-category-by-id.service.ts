import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Category } from '../../domain/category';
import { IGetCategoryByIDService } from '../../interfaces/services';

@Injectable()
export class GetCategoryByIDService implements IGetCategoryByIDService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(id: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    return category;
  }
}
