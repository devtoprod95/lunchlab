import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";

export class CreateOrderItemDto {
    @IsInt()
    @IsPositive()
    @ApiProperty({
      description: '상품 ID',
      example: 1
    })
    productId: number;
  
    @IsInt()
    @IsPositive()
    @ApiProperty({
      description: '수량',
      example: 10
    })
    quantity: number;
  }