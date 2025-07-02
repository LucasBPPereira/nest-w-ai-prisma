import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDTO } from './order-item.dto';

export class CreateNewOrderDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  @IsNotEmpty()
  orderItems: OrderItemDTO[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
