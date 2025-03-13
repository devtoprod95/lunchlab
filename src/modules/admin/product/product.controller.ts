import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AdminProductService } from './product.service';
import { UpsertProductDto } from './dto/upsert-product-setting.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('admin/product')
@ApiTags('Admin.Product')
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: 400,
  description: '클라이언트 에러 통신'
})
export class AdminProductController {
  constructor(private readonly productService: AdminProductService) {}

  @Post('setting')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: '(관리자용) 회원 별 상품 판매 정책 설정 endPoint'
  })
  upsert(@Body() upsertProductDto: UpsertProductDto) {
    return this.productService.upsert(upsertProductDto);
  }
}
