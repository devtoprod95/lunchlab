import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class PagePaginationDto {
    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: '현재 페이지',
        example: 1
    })
    page?: number = 1;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: '페이지 수',
        example: 10
    })
    take?: number = 10;
}