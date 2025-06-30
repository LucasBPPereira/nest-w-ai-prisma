import { IsOptional, IsString } from 'class-validator';

export class QueryBookDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;
}
