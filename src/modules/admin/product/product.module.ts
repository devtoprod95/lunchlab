import { Module } from '@nestjs/common';
import { AdminProductService } from './product.service';
import { AdminProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/auth/entities/user.entity';
import { Product } from 'src/modules/user/product/entities/product.entity';
import { UserProduct } from 'src/modules/user/auth/entities/user-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      UserProduct
    ]),
  ],
  controllers: [AdminProductController],
  providers: [AdminProductService],
})
export class AdminProductModule {}
