import { User as PrismaUser } from '@prisma/client';
export class User implements PrismaUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
