import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetPurchaseHistoryOrder } from './get-purchase-history.service';
import { FindUserByIDService } from './find-user-by-id.service';
import { UserPreferencesService } from '../../user-preferences.service';
import { AiService } from 'src/config/ai/ai.service';
import { TYPES } from '../../interfaces/types';
import { GetBooksWithAuthorAndTitleService } from 'src/modules/book/app/services/get-books-w-author-and-title.service';

@Injectable()
export class GetPersonalizedRecommendationsService {
  constructor(
    private readonly getPurchaseHistoryS: GetPurchaseHistoryOrder,
    @Inject(TYPES.services.FindUserByIDService)
    private findUserByIDS: FindUserByIDService,
    private userPreferencesS: UserPreferencesService,
    private aiService: AiService,
    private getBooksOfResponseAI: GetBooksWithAuthorAndTitleService,
  ) {}

  public async execute(userId: string) {
    const userExists = await this.findUserByIDS.execute(userId);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const purchaseHistory = await this.getPurchaseHistoryS.execute(
      userExists.id,
    );

    const userPreferences = await this.userPreferencesS.getUserPreferences(
      userExists.id,
    );

    const response = await this.aiService.getPersonalizedRecommendations(
      purchaseHistory,
      userPreferences,
    );
    const booksRecommendation: { title: string; author: string }[] = [];

    for (const book of response.result) {
      const books = await this.getBooksOfResponseAI.execute(
        book.author,
        book.title,
      );
      if (books.length > 0) {
        booksRecommendation.push(
          ...books.map((book) => ({
            title: book.title,
            author: book.author,
          })),
        );
      }
    }

    return {
      data: booksRecommendation,
    };
  }
}
