import { Module, Provider } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { CATEGORYTYPE } from './interfaces/type';
import { CreateCategoryService } from './app/services/create-category.service';
import { DeleteCategoryService } from './app/services/delete-category.service';
import { GetAllCategoriesService } from './app/services/get-all-categories.service';
import { GetCategoryByNameService } from './app/services/get-category-by-name.service';
import { UpdateCategoryService } from './app/services/update-category.service';
import { CreateCategoryUseCase } from './app/useCases/create-category.usecase';
import { DeleteCategoryUseCase } from './app/useCases/delete-category.usecase';
import { GetAllCategoriesUseCase } from './app/useCases/get-all-categories.usecase';
import { UpdateCategoryUseCase } from './app/useCases/update-category.usecase';
import { GetCategoryByIDService } from './app/services/get-category-by-id.service';

const services: Provider[] = [
  {
    provide: CATEGORYTYPE.services.CreateCategoryService,
    useClass: CreateCategoryService,
  },
  {
    provide: CATEGORYTYPE.services.DeleteCategoryService,
    useClass: DeleteCategoryService,
  },
  {
    provide: CATEGORYTYPE.services.GetAllCategoriesService,
    useClass: GetAllCategoriesService,
  },
  {
    provide: CATEGORYTYPE.services.GetCategoryByNameService,
    useClass: GetCategoryByNameService,
  },
  {
    provide: CATEGORYTYPE.services.GetCategoryByIDService,
    useClass: GetCategoryByIDService,
  },
  {
    provide: CATEGORYTYPE.services.UpdateCategoryService,
    useClass: UpdateCategoryService,
  },
];
const useCases: Provider[] = [
  {
    provide: CATEGORYTYPE.useCases.CreateCategoryUseCase,
    useClass: CreateCategoryUseCase,
  },
  {
    provide: CATEGORYTYPE.useCases.DeleteCategoryUseCase,
    useClass: DeleteCategoryUseCase,
  },
  {
    provide: CATEGORYTYPE.useCases.GetAllCategoriesUseCase,
    useClass: GetAllCategoriesUseCase,
  },
  {
    provide: CATEGORYTYPE.useCases.UpdateCategoryUseCase,
    useClass: UpdateCategoryUseCase,
  },
];

@Module({
  controllers: [CategoryController],
  imports: [DatabaseModule],
  providers: [...services, ...useCases],
})
export class CategoryModule {}
