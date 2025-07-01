import { Category } from '../../domain/category';

export interface IGetCategoryByNameService {
  execute(name: string): Promise<Category | null>;
}
