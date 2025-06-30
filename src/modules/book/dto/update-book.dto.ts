import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stockQuantity: number;

  @IsOptional()
  @IsString()
  coverImageUrl: string | null;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
