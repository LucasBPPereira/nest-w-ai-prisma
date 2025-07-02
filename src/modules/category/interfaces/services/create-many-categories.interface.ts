import { Category } from '../../domain/category';
import { CreateCategoryDTO } from '../../dto/create-category.dto';

export interface ICreateManyCategoriesService {
  execute(categoryData: CreateCategoryDTO[]): Promise<Category[]>;
}
