import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryBookDTO } from './dto/query-book-controller.dto';
import { BOOKTYPES } from './interfaces/types';
import { DeleteBookUseCase } from './app/useCases/delete-book.usecase';
import { UpdateBookDTO } from './dto/update-book.dto';
import { UpdateBookUseCase } from './app/useCases/update-book.usecase';
import { GetAllBooksUseCase } from './app/useCases/get-all-books.usecase';
import { CreateManyBooksUseCase } from './app/useCases/create-many-books.usecase';
import { CreateBookUseCase } from './app/useCases/create-book.usecase';
import { CreateBookDTO } from './dto/create-book.dto';
import { GetBooksWithAuthorTitleUseCase } from './app/useCases/get-books-w-author-title.usecase';
import { GetBookByIDUseCase } from './app/useCases/get-book-by-id.usecase';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { CATEGORYTYPE } from '../category/interfaces/type';
import { GetAllCategoriesUseCase } from '../category/app/useCases/get-all-categories.usecase';
import { AiService } from 'src/config/ai/ai.service';
import { Category } from '../category/domain/category';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('book')
export class BookController {
  constructor(
    @Inject(BOOKTYPES.useCases.DeleteBookUseCase)
    private deleteBookUC: DeleteBookUseCase,
    @Inject(BOOKTYPES.useCases.UpdateBookUseCase)
    private updateBookUC: UpdateBookUseCase,
    @Inject(BOOKTYPES.useCases.GetAllBooksUseCase)
    private getAllBooksUC: GetAllBooksUseCase,
    @Inject(BOOKTYPES.useCases.GetBookByIDUseCase)
    private getBookByIDUC: GetBookByIDUseCase,
    @Inject(BOOKTYPES.useCases.GetBooksWithAuthorTitleUseCase)
    private getBooksWithAuTiUC: GetBooksWithAuthorTitleUseCase,
    @Inject(BOOKTYPES.useCases.CreateManyBooksUseCase)
    private createManyBooksUC: CreateManyBooksUseCase,
    @Inject(BOOKTYPES.useCases.CreateBookUseCase)
    private createBookUC: CreateBookUseCase,
    private reviewService: ReviewService,
    private aiService: AiService,
    @Inject(CATEGORYTYPE.useCases.GetAllCategoriesUseCase)
    private getAllCategoriesUC: GetAllCategoriesUseCase,
  ) {}
  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createBook(@Body() bookData: CreateBookDTO) {
    const newBook = await this.createBookUC.handle(bookData);
    return {
      data: newBook,
      message: 'Livro criado com sucesso.',
    };
  }

  @Post('many')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createBooks(@Body() booksData: CreateBookDTO[]) {
    const newsBooks = await this.createManyBooksUC.handle(booksData);
    return {
      data: newsBooks,
      message: 'Os livros foram criados com sucesso.',
    };
  }

  @Post('review')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createReviewBook(@Body() reviewData: CreateReviewDTO) {
    console.log(reviewData);
    const review = await this.reviewService.createReview(reviewData);
    return {
      data: review,
      message: 'Resenha criada.',
    };
  }

  @Get('')
  public async getAllBooks() {
    const books = await this.getAllBooksUC.handle();
    return {
      data: books,
      message:
        books.length === 1
          ? 'Livro retornado!'
          : books.length > 1
            ? 'Livros retornados!'
            : 'Nenhum livro foi retornado :(',
    };
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getBookByQuery(@Query() s: QueryBookDTO) {
    const books = await this.getBooksWithAuTiUC.handle(s);
    return {
      data: books,
      message: 'Estes foram os livros retornados.',
    };
  }

  @Get('suggest-categories')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getSuggestCategoryForBook(
    @Query('title') title: string,
    @Query('description') description: string,
  ) {
    const categ = await this.getAllCategoriesUC.handle();
    const categFormatted = categ.map((cat: Category) => cat.name);
    const iaResponse = await this.aiService.suggestCategoriesForBook(
      title,
      categFormatted,
      description,
    );
    return {
      ai: iaResponse,
      data: categFormatted,
    };
  }

  @Get(':id')
  public async getBookByID(@Param('id') id: number) {
    const book = await this.getBookByIDUC.handle(id);
    return {
      data: book,
      message: 'Livro retornado com sucesso.',
    };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateBook(
    @Param('id') id: number,
    @Body() bookData: UpdateBookDTO,
  ) {
    const updatedBook = await this.updateBookUC.handle(id, bookData);
    return {
      data: updatedBook,
      message: 'Livro atualizado com sucesso!',
    };
  }

  @Delete(':id')
  public async deleteBook(@Param('id') id: number) {
    const oldBook = await this.deleteBookUC.handle(id);
    return {
      data: oldBook,
      message: 'Livro deletado com sucesso!',
    };
  }
}
