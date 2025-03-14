import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderProduct } from '../order/entities/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      Order,
      OrderProduct
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, JwtModule],
})
export class UserAuthModule {}
