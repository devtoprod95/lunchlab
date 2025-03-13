import { Exclude } from "class-transformer";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";

@Entity({
    name: 'products',
    comment: '상품 정보 테이블'
})
export class Product {
    @PrimaryGeneratedColumn()
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    id: number;

    @Column({ 
        unique: true,
        nullable: false,
        type: 'int',
        comment: '상품ID'
    })
    productId: number;

    @Column({ 
        length: 50, 
        nullable: false,
        comment: '상품명'
    })
    name: string;

    @Column({ 
        type: 'int',
        unsigned: true,
        nullable: false,
        default: 0,
        comment: '상품가격'
    })
    price: number;

    @ManyToMany(
        () => User,
        (user) => user.products
    )
    users: User[];
}
