import { Category } from '../../domain/category';

export interface IDeleteCategoryService {
  execute(id: number): Promise<Category>;
}
