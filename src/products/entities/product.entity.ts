import { Exclude } from "class-transformer";
import { OrderItem } from "src/orders/entities/order-item.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column()
    quantity: number

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];

    @Exclude()
    @CreateDateColumn()
    created_at: Date

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date
}

