import { Category } from '../../domain/category';

export interface IGetAllCategoriesUseCase {
  handle(): Promise<Category[] | []>;
}
