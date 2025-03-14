import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonEntitiesModule } from 'src/modules/common-entities.module';

@Module({
  imports: [
    CommonEntitiesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class UserAuthModule {}
