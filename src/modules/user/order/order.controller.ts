import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RBAC } from '../auth/decorator/rbac.decorator';
import { Role } from '../auth/entities/user.entity';
import { UserId } from '../auth/decorator/user-id.decorator';

@Controller('user/order')
@ApiTags('User.Order')
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: 400,
  description: '클라이언트 에러 통신'
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @RBAC(Role.user)
  @ApiBearerAuth()
  @ApiOperation({
    description: '주문 등록 endPoint'
  })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @UserId() userId: number
  ) {
    return this.orderService.create(createOrderDto, userId);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}
