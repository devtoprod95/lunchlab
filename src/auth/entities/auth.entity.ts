import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Auth {
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

    @CreateDateColumn({ 
        comment: '계정 생성 일시' 
    })
    createdAt: Date;

    @UpdateDateColumn({ 
        comment: '계정 정보 수정 일시' 
    })
    updatedAt: Date;
}
