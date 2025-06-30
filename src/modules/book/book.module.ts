import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  controllers: [BookController],
  imports: [DatabaseModule],
})
export class BookModule {}
