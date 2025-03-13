import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
    name: 'users_products',
    comment: '유저-상품 N:M 관계 테이블'
})
export class UserProduct {
    @PrimaryGeneratedColumn()
    @ApiHideProperty()
    id: number;

    @ManyToOne(() => User, user => user.products)
    @JoinColumn({ name: 'user_id' })
    @ApiProperty({
        description: '유저 정보',
    })
    user: User;

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
    @ApiProperty({
        description: '상품 정보',
        type: () => Product
    })
    product: Product;

    @Column({ 
        type: 'int',
        default: 0,
        comment: '상품 가격' 
    })
    @ApiProperty({
        description: '상품 가격',
        example: 3000
    })
    price: number;

    @Column({ 
        type: 'boolean', 
        default: false,
        comment: '구매가능여부' 
    })
    @ApiProperty({
        description: '구매가능여부',
        example: false
    })
    hidden: boolean;
}