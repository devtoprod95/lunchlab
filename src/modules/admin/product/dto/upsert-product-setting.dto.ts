import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpsertProductDto {
    @IsNumber()
    @ApiProperty({
        description: '상품ID',
        example: 1
    })
    productId: number;

    @IsNumber()
    @ApiProperty({
        description: '회원ID',
        example: 1
    })
    userId: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: '상품 가격',
        example: 3000
    })
    price?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: '구매가능여부',
        example: false
    })
    hidden?: boolean;
}
