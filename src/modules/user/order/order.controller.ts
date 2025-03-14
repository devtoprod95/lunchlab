import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { Role } from '../auth/entities/user.entity';
import { UserId } from '../auth/decorator/user-id.decorator';
import { DateValidationPipe } from 'src/common/pipe/date-validation.pipe';
import { PagePaginationDto } from 'src/common/dto/page-pagination.dto';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { OrderListResponseSchema } from './decorator/order-list-response.decorator';

@Controller('user/order')
@ApiTags('User.Order')
@ApiBearerAuth()
@RBAC(Role.user)
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: 400,
  description: '클라이언트 에러 통신'
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    description: '주문 등록 endPoint'
  })
  @UseInterceptors(TransactionInterceptor)
  create(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number,
    @QueryRunner() queryRunner: QR,
  ) {
    return this.orderService.create(createOrderDto, userId, queryRunner);
  }

  @Get(':deliveryDate')
  @ApiOperation({
    description: '주문 조회 endPoint'
  })
  @ApiParam({ 
    name: 'deliveryDate', 
    description: '배송 날짜 (YYYY-MM-DD 형식)',
    example: '2025-02-20' 
  })
  @OrderListResponseSchema()
  findAll(
    @Param('deliveryDate', DateValidationPipe) deliveryDate: string,
    @Query() pagePaginationDto: PagePaginationDto
  ) {
    return this.orderService.findAll(deliveryDate, pagePaginationDto);
  }
}
