import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

export interface ICreateCategoryUseCase {
  handle(categoryData: CreateCategoryDTO): Promise<Category>;
}
