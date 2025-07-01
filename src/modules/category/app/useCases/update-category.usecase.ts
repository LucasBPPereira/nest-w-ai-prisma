import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateCategoryUseCase } from '../../interfaces/useCases';
import { CATEGORYTYPE } from '../../interfaces/type';
import { UpdateCategoryService } from '../services/update-category.service';
import { GetCategoryByIDService } from '../services/get-category-by-id.service';
import { Category } from '../../domain/category';
import { UpdateCategoryDTO } from '../../dto/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORYTYPE.services.UpdateCategoryService)
    private updateCategoryS: UpdateCategoryService,
    @Inject(CATEGORYTYPE.services.GetCategoryByIDService)
    private getCategoryByIDS: GetCategoryByIDService,
  ) {}
  public async handle(
    id: number,
    categoryData: UpdateCategoryDTO,
  ): Promise<Category> {
    const categoryExists = await this.getCategoryByIDS.execute(id);
    if (!categoryExists) {
      throw new NotFoundException('O ID da categoria não foi encontrado!');
    }

    const updatedCategory = await this.updateCategoryS.execute(
      id,
      categoryData,
    );
    return updatedCategory;
  }
}
