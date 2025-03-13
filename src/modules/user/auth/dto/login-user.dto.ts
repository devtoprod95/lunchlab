import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends PartialType(CreateUserDto) {
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
}