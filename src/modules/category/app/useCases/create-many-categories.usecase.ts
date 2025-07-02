import { Inject, Injectable } from '@nestjs/common';
import { ICreateManyCategoriesUseCase } from '../../interfaces/useCases';
import { CATEGORYTYPE } from '../../interfaces/type';
import { GetCategoryByNameService } from '../services/get-category-by-name.service';
import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';
import { CreateManyCategoriesService } from '../services/create-many-categories.service';

@Injectable()
export class CreateManyCategoriesUseCase
  implements ICreateManyCategoriesUseCase
{
  constructor(
    @Inject(CATEGORYTYPE.services.CreateManyCategoriesService)
    private createCategoryS: CreateManyCategoriesService,
    @Inject(CATEGORYTYPE.services.GetCategoryByNameService)
    private getCategoryByNameS: GetCategoryByNameService,
  ) {}

  public async handle(categoryData: CreateCategoryDTO[]): Promise<Category[]> {
    for (const category of categoryData) {
      const categoryExists = await this.getCategoryByNameS.execute(
        category.name,
      );
      if (categoryExists) {
        throw new Error('A categoria já existe, insira outra!');
      }
    }

    const newCategory = await this.createCategoryS.execute(categoryData);
    return newCategory;
  }
}
