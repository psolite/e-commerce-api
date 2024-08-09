import { Exclude } from "class-transformer";
import { IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @IsUUID()
    id: string

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Exclude()
    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
