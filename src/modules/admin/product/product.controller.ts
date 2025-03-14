import { Controller, Post, Body, HttpCode, HttpStatus, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AdminProductService } from './product.service';
import { UpsertProductDto } from './dto/upsert-product-setting.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';

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
  @UseInterceptors(TransactionInterceptor)
  upsert(
    @Body() upsertProductDto: UpsertProductDto,
    @QueryRunner() queryRunner: QR,
  ) {
    return this.productService.upsert(upsertProductDto, queryRunner);
  }
}
