import { UserPreferences as PrismaUserPreferences } from '@prisma/client';
export interface UserPreferences extends PrismaUserPreferences {
  id: number;
  userId: string;
  categoryId: number;
}
