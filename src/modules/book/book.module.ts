import { Module, Provider } from '@nestjs/common';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { BOOKTYPES } from './interfaces/types';
import { CreateBookUseCase } from './app/useCases/create-book.usecase';
import { CreateManyBooksUseCase } from './app/useCases/create-many-books.usecase';
import { DeleteBookUseCase } from './app/useCases/delete-book.usecase';
import { GetAllBooksUseCase } from './app/useCases/get-all-books.usecase';
import { GetBookByIDUseCase } from './app/useCases/get-book-by-id.usecase';
import { GetBooksWithAuthorTitleUseCase } from './app/useCases/get-books-w-author-title.usecase';
import { UpdateBookUseCase } from './app/useCases/update-book.usecase';
import { CreateBookService } from './app/services/create-book.service';
import { CreateManyBooksService } from './app/services/create-many-books.service';
import { DeleteBookService } from './app/services/delete-book.service';
import { GetAllBooksService } from './app/services/get-all-books.service';
import { GetBookByAuthorService } from './app/services/get-book-by-author.service';
import { GetBookByIDService } from './app/services/get-book-by-id.service';
import { GetBookByTitleService } from './app/services/get-book-by-title.service';
import { GetBooksWithAuthorAndTitleService } from './app/services/get-books-w-author-and-title.service';
import { UpdateBookService } from './app/services/update-book.service';
import { ReviewService } from './review.service';
import { AiModule } from 'src/config/ai/ai.module';
import { CATEGORYTYPE } from '../category/interfaces/type';
import { GetAllCategoriesUseCase } from '../category/app/useCases/get-all-categories.usecase';
import { GetAllCategoriesService } from '../category/app/services/get-all-categories.service';
const useCases: Provider[] = [
  {
    provide: BOOKTYPES.useCases.CreateBookUseCase,
    useClass: CreateBookUseCase,
  },
  {
    provide: BOOKTYPES.useCases.CreateManyBooksUseCase,
    useClass: CreateManyBooksUseCase,
  },
  {
    provide: BOOKTYPES.useCases.DeleteBookUseCase,
    useClass: DeleteBookUseCase,
  },
  {
    provide: BOOKTYPES.useCases.GetAllBooksUseCase,
    useClass: GetAllBooksUseCase,
  },
  {
    provide: BOOKTYPES.useCases.GetBookByIDUseCase,
    useClass: GetBookByIDUseCase,
  },
  {
    provide: BOOKTYPES.useCases.GetBooksWithAuthorTitleUseCase,
    useClass: GetBooksWithAuthorTitleUseCase,
  },
  {
    provide: BOOKTYPES.useCases.UpdateBookUseCase,
    useClass: UpdateBookUseCase,
  },
];

const services: Provider[] = [
  {
    provide: BOOKTYPES.services.CreateBookService,
    useClass: CreateBookService,
  },
  {
    provide: BOOKTYPES.services.CreateManyBooksService,
    useClass: CreateManyBooksService,
  },
  {
    provide: BOOKTYPES.services.DeleteBookService,
    useClass: DeleteBookService,
  },
  {
    provide: BOOKTYPES.services.GetAllBooksService,
    useClass: GetAllBooksService,
  },
  {
    provide: BOOKTYPES.services.GetBookByAuthorService,
    useClass: GetBookByAuthorService,
  },
  {
    provide: BOOKTYPES.services.GetBookByIDService,
    useClass: GetBookByIDService,
  },
  {
    provide: BOOKTYPES.services.GetBookByTitleService,
    useClass: GetBookByTitleService,
  },
  {
    provide: BOOKTYPES.services.GetBooksWithAuthorAndTitleService,
    useClass: GetBooksWithAuthorAndTitleService,
  },
  {
    provide: BOOKTYPES.services.UpdateBookService,
    useClass: UpdateBookService,
  },
];

@Module({
  controllers: [BookController],
  imports: [DatabaseModule, AiModule],
  providers: [
    ...useCases,
    ...services,
    ReviewService,
    {
      provide: CATEGORYTYPE.useCases.GetAllCategoriesUseCase,
      useClass: GetAllCategoriesUseCase,
    },
    {
      provide: CATEGORYTYPE.services.GetAllCategoriesService,
      useClass: GetAllCategoriesService,
    },
  ],
  exports: [
    {
      provide: BOOKTYPES.services.GetBookByIDService,
      useClass: GetBookByIDService,
    },
    {
      provide: BOOKTYPES.services.GetBooksWithAuthorAndTitleService,
      useClass: GetBooksWithAuthorAndTitleService,
    },
  ],
})
export class BookModule {}
