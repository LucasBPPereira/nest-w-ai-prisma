import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  // Parâmetro rating como string, conforme o schema
  public async createReview(reviewData: CreateReviewDTO) {
    const newReview = await this.prisma.review.create({
      data: reviewData,
      include: {
        book: true,
        user: true,
      },
    });
    return newReview;
  }

  public async getBookReviews(bookId: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        bookId: Number(bookId),
      },
    });
    return reviews;
  }
}
