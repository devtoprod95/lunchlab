import { Exclude, Transform } from "class-transformer";
import { BaseTable } from "src/common/entity/base-table.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    username: string;

    @Column({ 
        length: 100, 
        comment: '패스워드' 
    })
    @Exclude({
        toPlainOnly: true, // 응답할때 제외
    })
    password: string;

    @Column({ 
        length: 50, 
        comment: '이름'
    })
    name: string;

    @Column({ 
        length: 50, 
        comment: '휴대전화번호 (e164)'
    })
    phone: string;

    @Column({ 
        length: 50, 
        comment: '회사명'
    })
    company: string;
    
    @Column({ 
        name: 'last_login_at', 
        type: 'datetime',
        nullable: true,
        comment: '마지막 로그인 일시' 
    })
    @Transform(({ value }) => value === null ? null : value)
    lastLoginAt: Date | null;
}
