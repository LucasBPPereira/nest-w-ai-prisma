import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

export interface ICreateCategoryService {
  execute(categoryData: CreateCategoryDTO): Promise<Category>;
}
