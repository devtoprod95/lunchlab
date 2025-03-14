import { Controller, Post, UseInterceptors, ClassSerializerInterceptor, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Role } from '../auth/entities/user.entity';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListProductDto } from './dto/list-product.dto';
import { ProductListResponseSchema } from './decorator/product-list-response.decorator';

@Controller('user/product')
@ApiTags('User.Product')
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: 400,
  description: '클라이언트 에러 통신'
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @RBAC(Role.user)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: '상품 목록 및 가격 조회 endPoint'
  })
  @ProductListResponseSchema()
  findAll(
    @Body() listProductDto: ListProductDto
  ) {
    return this.productService.findAll(listProductDto);
  }
}
