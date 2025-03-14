import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CommonEntitiesModule } from 'src/modules/common-entities.module';

@Module({
  imports: [
    CommonEntitiesModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class UserOrderModule {}
