import { User as PrismaUser } from '@prisma/client';
export class User implements PrismaUser {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
