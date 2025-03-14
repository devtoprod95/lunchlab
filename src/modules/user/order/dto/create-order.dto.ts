import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: '배송 요청일',
      example: '2025-02-20'
    })
    deliveryDate: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      description: '주문 요청사항',
      example: '문 앞에 놓아주세요'
    })
    comment: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    @ApiProperty({
      description: '주문 상품 목록',
      type: [CreateOrderItemDto],
      example: [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 24,
          quantity: 4
        }
      ]
    })
    items: CreateOrderItemDto[];
  }