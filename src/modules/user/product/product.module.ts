import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProduct } from '../auth/entities/user-product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProduct
    ]),
    JwtModule.register({}),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, JwtModule],
})
export class UserProductModule {}
