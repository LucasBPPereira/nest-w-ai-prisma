import { Category } from '../../domain/category';
import { UpdateCategoryDTO } from '../../dto/update-category.dto';

export interface IUpdateCategoryUseCase {
  handle(id: number, categoryData: UpdateCategoryDTO): Promise<Category>;
}
