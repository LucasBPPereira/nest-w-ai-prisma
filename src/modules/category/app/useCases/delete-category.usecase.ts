import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteCategoryUseCase } from '../../interfaces/useCases';
import { CATEGORYTYPE } from '../../interfaces/type';
import { DeleteCategoryService } from '../services/delete-category.service';
import { Category } from '../../domain/category';
import { GetCategoryByIDService } from '../services/get-category-by-id.service';

@Injectable()
export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORYTYPE.services.DeleteCategoryService)
    private deleteCategoryS: DeleteCategoryService,
    @Inject(CATEGORYTYPE.services.GetCategoryByIDService)
    private getCategoryByIDS: GetCategoryByIDService,
  ) {}

  public async handle(id: number): Promise<Category> {
    const categoryExists = await this.getCategoryByIDS.execute(id);
    if (!categoryExists) {
      throw new NotFoundException('O ID da categoria não existe!');
    }

    const categoryDeleted = await this.deleteCategoryS.execute(id);
    return categoryDeleted;
  }
}
