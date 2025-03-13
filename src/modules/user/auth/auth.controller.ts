import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user/auth')
@ApiTags('User.Auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: 400,
  description: '클라이언트 에러 통신'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiOperation({
    description: '회원 가입 endPoint'
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: '로그인 endPoint'
  })
  login(
    @Body() LoginUserDto: LoginUserDto
  ) {
    return this.authService.login(LoginUserDto);
  }

}
