import { Module } from '@nestjs/common';
import { AdminProductService } from './product.service';
import { AdminProductController } from './product.controller';
import { CommonEntitiesModule } from 'src/modules/common-entities.module';

@Module({
  imports: [
    CommonEntitiesModule
  ],
  controllers: [AdminProductController],
  providers: [AdminProductService],
})
export class AdminProductModule {}
