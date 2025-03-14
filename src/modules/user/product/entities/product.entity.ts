import { Exclude } from "class-transformer";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { OrderProduct } from "../../order/entities/order-product.entity";

@Entity({
    name: 'products',
    comment: '상품 정보 테이블'
})
export class Product {
    @PrimaryGeneratedColumn()
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    @ApiHideProperty()
    id: number;

    @Column({ 
        name: 'product_id', 
        unique: true,
        nullable: false,
        type: 'int',
        comment: '상품ID'
    })
    @ApiProperty({
        description: '상품ID',
        example: 1
    })
    productId: number;

    @Column({ 
        length: 50, 
        nullable: false,
        comment: '상품명'
    })
    @ApiProperty({
        description: '상품명',
        example: '가정식 도시락'
    })
    name: string;

    @Column({ 
        type: 'int',
        unsigned: true,
        nullable: false,
        default: 0,
        comment: '상품가격'
    })
    @ApiProperty({
        description: '상품가격',
        example: 3000
    })
    price: number;

    @ManyToMany(
        () => User,
        (user) => user.products
    )
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    users: User[];

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    orderProducts: OrderProduct[];
}
