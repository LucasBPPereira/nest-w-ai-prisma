import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty({ message: 'O titulo do livro não pode estar vazio!' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'O nome do autor do livro não pode estar vazio!' })
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsNotEmpty({ message: 'Insira o preço do livro!' })
  @IsNumber()
  price: number;

  @IsNotEmpty({
    message: 'O valor da quantidade em estoque deve ser fornecido!',
  })
  @IsNumber()
  stockQuantity: number;

  @IsNotEmpty({ message: 'Informe a data de publicação do livro!' })
  @IsDateString()
  publicationDate: string;

  @IsOptional()
  @IsString()
  coverImageUrl: string | null;

  @IsNotEmpty({ message: 'Informe uma categoria para o livro válida!' })
  @IsNumber()
  categoryId: number;
}
