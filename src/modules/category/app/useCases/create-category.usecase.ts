import { Inject, Injectable } from '@nestjs/common';
import { ICreateCategoryUseCase } from '../../interfaces/useCases';
import { CATEGORYTYPE } from '../../interfaces/type';
import { CreateCategoryService } from '../services/create-category.service';
import { GetCategoryByNameService } from '../services/get-category-by-name.service';
import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

@Injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @Inject(CATEGORYTYPE.services.CreateCategoryService)
    private createCategoryS: CreateCategoryService,
    @Inject(CATEGORYTYPE.services.GetCategoryByNameService)
    private getCategoryByNameS: GetCategoryByNameService,
  ) {}

  public async handle(categoryData: CreateCategoryDTO): Promise<Category> {
    const categoryExists = await this.getCategoryByNameS.execute(
      categoryData.name,
    );
    if (categoryExists) {
      throw new Error('A categoria já existe, insira outra!');
    }

    const newCategory = await this.createCategoryS.execute(categoryData);
    return newCategory;
  }
}
