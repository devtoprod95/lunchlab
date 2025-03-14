import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { PagePaginationDto } from "src/common/dto/page-pagination.dto";

export class ListProductDto extends PagePaginationDto {

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: '회원ID',
        example: 1
    })
    user_id?: number;
}