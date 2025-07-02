import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class OrderItemDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;
}
