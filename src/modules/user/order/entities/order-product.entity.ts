import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { Order } from "./order.entity";
import { Product } from "../../product/entities/product.entity";
import { Exclude } from "class-transformer";

@Entity({
    name: 'orders_products',
    comment: '주문-상품 N:M 관계 테이블'
})
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    order: Order;

    @Column({ 
        name: 'product_id',
        nullable: false,
        type: 'int',
        comment: '상품ID'
    })
    @ApiProperty({
        description: '상품ID',
        example: 1
    })
    productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'productId' })
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    product: Product;
    
    @Column({
        type: 'int',
        default: 1,
        comment: '주문 수량'
    })
    @ApiProperty({
        description: '주문 수량',
        example: 1
    })
    quantity: number;
}