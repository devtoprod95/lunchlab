import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class BaseTable {
    @Column({ 
        name: 'created_at', 
        type: 'datetime',
        nullable: false,
        comment: '생성 일시',
        default: () => "NOW() + INTERVAL 9 HOUR",
    })
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    @ApiHideProperty()
    createdAt: Date;

    @Column({ 
        name: 'updated_at', 
        type: 'datetime',
        nullable: false,
        comment: '수정 일시',
        default: () => "NOW()",
    })
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    @ApiHideProperty()
    updatedAt: Date;

    @VersionColumn()
    @Exclude({
        toPlainOnly: true, // 응답할때만 제외
    })
    @ApiHideProperty()
    version: number;
}