import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AdminProductService } from './product.service';
import { UpsertProductDto } from './dto/upsert-product-setting.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/product')
@ApiTags('Admin.Product')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminProductController {
  constructor(private readonly productService: AdminProductService) {}

  @Post('setting')
  @HttpCode(HttpStatus.OK)
  upsert(@Body() upsertProductDto: UpsertProductDto) {
    return this.productService.upsert(upsertProductDto);
  }


}
