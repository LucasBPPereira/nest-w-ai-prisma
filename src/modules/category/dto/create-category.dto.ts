import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio!' })
  name: string;
}
