import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('user_products')
export class UserProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.products)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, product => product.users)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ 
        type: 'int',
        default: 0,
        comment: '상품 가격' 
    })
    price: number;

    @Column({ 
        type: 'boolean', 
        default: false,
        comment: '구매가능여부' 
    })
    hidden: boolean;
}