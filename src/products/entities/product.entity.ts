import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2})
    price: number

    @Column()
    quantity: number

    @Exclude()
    @CreateDateColumn()
    created_at: Date

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date
}

