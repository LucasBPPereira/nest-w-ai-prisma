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
