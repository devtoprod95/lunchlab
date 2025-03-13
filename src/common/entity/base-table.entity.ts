import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class BaseTable {
    @CreateDateColumn({ 
        name: 'created_at',
        comment: '생성 일시',
        type: 'timestamp',
    })
    @Exclude()
    @ApiHideProperty()
    createdAt: Date;
      
    @UpdateDateColumn({ 
        name: 'updated_at',
        comment: '수정 일시',
        type: 'timestamp',
    })
    @Exclude()
    @ApiHideProperty()
    updatedAt: Date;

    @VersionColumn()
    @Exclude()
    @ApiHideProperty()
    version: number;
}