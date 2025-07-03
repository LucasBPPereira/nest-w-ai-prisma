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

  public async saveManyUserPreferences(
    userId: string,
    categories: { categoriesId: number[] },
  ) {
    const categoriesId = categories.categoriesId;
    const categ: { userId: string; categoryId: number }[] = [];
    for (const category of categoriesId) {
      categ.push({
        userId: userId,
        categoryId: category,
      });
    }
    const preferences = await this.prisma.userPreferences.createManyAndReturn({
      data: categ,
    });
    return preferences;
  }

  public async getUserPreferences(userId: string) {
    const preferences = await this.prisma.userPreferences.findMany({
      where: {
        userId,
      },
      omit: {
        userId: true,
        id: true,
        categoryId: true,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const categoriesPreferences: string[] = preferences.map(
      (pref) => pref.category.name,
    );

    return categoriesPreferences;
  }
}
