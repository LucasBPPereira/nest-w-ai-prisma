import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: 'Você não pode atualizar um nome vazio para a categoria!',
  })
  name: string;
}
