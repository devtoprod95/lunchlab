import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/auth/entities/user.entity";
import { Product } from "./user/product/entities/product.entity";
import { UserProduct } from "./user/auth/entities/user-product.entity";
import { OrderProduct } from "./user/order/entities/order-product.entity";
import { Order } from "./user/order/entities/order.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Product,
            UserProduct,
            Order,
            OrderProduct
        ]),
    ],
    exports: [TypeOrmModule]
})
export class CommonEntitiesModule {}