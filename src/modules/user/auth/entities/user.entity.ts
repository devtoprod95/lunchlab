import { Exclude, Transform } from "class-transformer";
import { BaseTable } from "src/common/entity/base-table.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export enum Role {
    admin,
    user
}

@Entity({
    name: 'users',
    comment: '유저 정보 테이블'
})
export class User extends BaseTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        unique: true, 
        length: 50, 
        comment: '아이디'
    })
    @ApiProperty({
        description: '아이디',
        example: '홍길test1동'
    })
    username: string;

    @Column({ 
        length: 100, 
        comment: '패스워드' 
    })
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    @ApiHideProperty()
    password: string;

    @Column({ 
        length: 50, 
        comment: '이름'
    })
    @ApiProperty({
        description: '이름',
        example: '홍길동'
    })
    name: string;

    @Column({ 
        length: 50, 
        comment: '휴대전화번호 (e164)'
    })
    @ApiProperty({
        description: '휴대전화번호 (e164)',
        example: '+821012341234'
    })
    phone: string;

    @Column({ 
        length: 50, 
        comment: '회사명'
    })
    @ApiProperty({
        description: '회사명',
        example: '(주) 런치랩'
    })
    company: string;
    
    @Column({ 
        name: 'last_login_at', 
        type: 'datetime',
        nullable: true,
        comment: '마지막 로그인 일시' 
    })
    @ApiProperty({
        name: 'last_login_at',
        description: '마지막 로그인 일시',
        example: '2023-01-01T12:00:00Z'
    })
    @Transform(({ value }) => value === null ? null : value)
    lastLoginAt: Date | null;

    @ManyToMany(
        () => Product,
        (product) => product.users
    )
    @ApiHideProperty()
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    products: Product[];
}
