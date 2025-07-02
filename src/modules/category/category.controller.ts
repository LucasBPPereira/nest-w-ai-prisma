import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CATEGORYTYPE } from './interfaces/type';
import { CreateCategoryUseCase } from './app/useCases/create-category.usecase';
import { DeleteCategoryUseCase } from './app/useCases/delete-category.usecase';
import { GetAllCategoriesUseCase } from './app/useCases/get-all-categories.usecase';
import { UpdateCategoryUseCase } from './app/useCases/update-category.usecase';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CreateManyCategoriesUseCase } from './app/useCases/create-many-categories.usecase';

@UseInterceptors(LoggingInterceptor)
@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORYTYPE.useCases.CreateCategoryUseCase)
    private createCategoryUC: CreateCategoryUseCase,
    @Inject(CATEGORYTYPE.useCases.CreateManyCategoriesUseCase)
    private createManyCategUC: CreateManyCategoriesUseCase,
    @Inject(CATEGORYTYPE.useCases.DeleteCategoryUseCase)
    private deleteCategoryUC: DeleteCategoryUseCase,
    @Inject(CATEGORYTYPE.useCases.GetAllCategoriesUseCase)
    private getAllCategoriesUC: GetAllCategoriesUseCase,
    @Inject(CATEGORYTYPE.useCases.UpdateCategoryUseCase)
    private updateCategoryUC: UpdateCategoryUseCase,
  ) {}
  @Get('')
  public async getAllCategories() {
    const categories = await this.getAllCategoriesUC.handle();

    return {
      data: categories,
      message:
        categories.length === 1
          ? 'Livro retornado!'
          : categories.length > 1
            ? 'Livros retornados!'
            : 'Nenhum livro foi retornado :(',
    };
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createCategory(@Body() categoryData: CreateCategoryDTO) {
    const newCategory = await this.createCategoryUC.handle(categoryData);
    return {
      data: newCategory,
      message: 'Categoria criada com sucesso!',
    };
  }
  @Post('many')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createManyCategories(@Body() categoryData: CreateCategoryDTO[]) {
    const newCategories = await this.createManyCategUC.handle(categoryData);
    return {
      data: newCategories,
      message: 'Categorias criadas com sucesso!',
    };
  }

  @Put(':id')
  public async updateCategory(
    @Param('id') id: number,
    @Body() categoryData: UpdateCategoryDTO,
  ) {
    if (!id) {
      throw new NotFoundException('ID não enviada.');
    }
    const updateCategory = await this.updateCategoryUC.handle(id, categoryData);
    return {
      data: updateCategory,
      message: 'A categoria foi atualizada com sucesso',
    };
  }

  @Delete(':id')
  public async deleteCategory(@Param('id') id: number) {
    if (!id) {
      throw new NotFoundException('ID não enviada.');
    }
    const deleteCategory = await this.deleteCategoryUC.handle(id);
    return {
      data: deleteCategory,
      message: 'A categoria foi deletada com sucesso',
    };
  }
}
