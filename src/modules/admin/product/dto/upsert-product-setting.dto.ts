import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpsertProductDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsBoolean()
    @IsOptional()
    hidden?: boolean;
}
