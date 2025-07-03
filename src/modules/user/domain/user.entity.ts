import { User as PrismaUser } from '@prisma/client';
export interface User extends PrismaUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
