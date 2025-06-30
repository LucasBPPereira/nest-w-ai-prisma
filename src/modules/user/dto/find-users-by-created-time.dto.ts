import { IsOptional, IsString } from 'class-validator';

export class FindUsersByCreatedTimeDTO {
  @IsOptional()
  @IsString()
  equal: string;

  /**
   * Propriedade "gran than or equal" = maior que ou igual
   */
  @IsOptional()
  @IsString()
  gte: string;

  /**
   * Propriedade "lower than or equal" = menor que ou igual
   */
  @IsOptional()
  @IsString()
  lte: string;
}
