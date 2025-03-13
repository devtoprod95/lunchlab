import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({
        description: '아이디',
        example: 'test1동'
    })
    username: string;

    @IsString()
    @ApiProperty({
        description: '비밀번호',
        example: '1234'
    })
    password: string;

    @IsString()
    @ApiProperty({
        description: '이름',
        example: '홍길동'
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: '휴대전화번호 (e164)',
        example: '+821012341234'
    })
    phone: string;

    @IsString()
    @ApiProperty({
        description: '회사명',
        example: '(주) 런치랩'
    })
    company: string;
}
