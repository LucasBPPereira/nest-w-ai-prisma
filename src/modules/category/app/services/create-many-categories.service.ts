import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { CreateCategoryDTO } from '../../dto/create-category.dto';
import { ICreateManyCategoriesService } from '../../interfaces/services';

@Injectable()
export class CreateManyCategoriesService
  implements ICreateManyCategoriesService
{
  constructor(private readonly prisma: PrismaService) {}
  public async execute(data: CreateCategoryDTO[]) {
    const categories = await this.prisma.category.createManyAndReturn({
      data: data,
    });
    return categories;
  }
}
