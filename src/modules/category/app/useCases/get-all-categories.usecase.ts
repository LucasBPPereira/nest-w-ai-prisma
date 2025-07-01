import { Inject, Injectable } from '@nestjs/common';
import { IGetAllCategoriesUseCase } from '../../interfaces/useCases';
import { CATEGORYTYPE } from '../../interfaces/type';
import { GetAllCategoriesService } from '../services/get-all-categories.service';
import { Category } from '../../domain/category';

@Injectable()
export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {
  constructor(
    @Inject(CATEGORYTYPE.services.GetAllCategoriesService)
    private getAllCategoriesS: GetAllCategoriesService,
  ) {}

  public async handle(): Promise<Category[] | []> {
    const categories = await this.getAllCategoriesS.execute();
    return categories;
  }
}
