import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

export interface ICreateManyCategoriesUseCase {
  handle(categoryData: CreateCategoryDTO[]): Promise<Category[]>;
}
