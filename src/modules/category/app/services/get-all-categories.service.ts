import { Injectable } from '@nestjs/common';
import { IGetAllCategoriesService } from '../../interfaces/services';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { Category } from '../../domain/category';

@Injectable()
export class GetAllCategoriesService implements IGetAllCategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  public async execute(): Promise<Category[] | []> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
