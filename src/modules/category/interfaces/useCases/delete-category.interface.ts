import { Category } from '../../domain/category';

export interface IDeleteCategoryUseCase {
  handle(id: number): Promise<Category>;
}
