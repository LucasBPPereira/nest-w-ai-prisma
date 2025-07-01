import { Category } from '../../domain/category';
import { UpdateCategoryDTO } from '../../dto/update-category.dto';

export interface IUpdateCategoryService {
  execute(id: number, categoryData: UpdateCategoryDTO): Promise<Category>;
}
