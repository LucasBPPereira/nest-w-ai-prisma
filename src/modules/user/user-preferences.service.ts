import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class UserPreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  public async saveUserPreferences(userId: string, categoryId: number) {
    const preferences = await this.prisma.userPreferences.create({
      data: {
        userId: userId,
        categoryId: categoryId,
      },
    });

    return preferences;
  }

  public async getUserPreferences(userId: string) {
    const preferences = await this.prisma.userPreferences.findMany({
      where: {
        userId,
      },
    });

    return preferences;
  }
}
