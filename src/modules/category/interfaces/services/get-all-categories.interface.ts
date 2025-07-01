import { Category } from '../../domain/category';

export interface IGetAllCategoriesService {
  execute(): Promise<Category[] | []>;
}
