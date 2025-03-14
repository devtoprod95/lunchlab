import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommonEntitiesModule } from 'src/modules/common-entities.module';

@Module({
  imports: [
    CommonEntitiesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class UserProductModule {}
