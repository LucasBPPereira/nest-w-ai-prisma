import { Category } from '../../domain/category';

export interface IGetCategoryByIDService {
  execute(id: number): Promise<Category | null>;
}
