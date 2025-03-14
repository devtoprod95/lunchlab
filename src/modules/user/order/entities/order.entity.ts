import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { BaseTable } from "src/common/entity/base-table.entity";
import { OrderProduct } from "./order-product.entity";
import { Exclude } from "class-transformer";

@Entity({
    name: 'orders',
    comment: '주문 기본 정보 테이블'
})
export class Order extends BaseTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        type: 'date',
        name: 'delivery_date',
        nullable: false,
        comment: '배송 요청일'
    })
    @ApiProperty({
        description: '배송 요청일',
        example: '2025-02-20',
        type: 'string',
        format: 'date'
    })
    deliveryDate: Date;

    @Column({ 
        length: 100,
        nullable: false,
        comment: '주문 요청사항'
    })
    @ApiProperty({
        description: '주문 요청사항',
        example: '문 앞에 놓아주세요'
    })
    comment: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    user: User;

    @Column({
        name: 'user_id',
        comment: '사용자 ID',
        nullable: false
    })
    @ApiProperty({
        description: '사용자 ID',
        example: 1
    })
    userId: number;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    @ApiProperty({
        description: '주문 상품 목록',
        type: () => [OrderProduct]
    })
    orderProducts: OrderProduct[];
}