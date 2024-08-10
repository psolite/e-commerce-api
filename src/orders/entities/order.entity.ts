import { Exclude } from "class-transformer"
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerName: string;

    @Column()
    customerEmail: string;

    @Column()
    customerAddress: string;

    @Column()
    customerPhone: string;

    @CreateDateColumn()
    order_date: Date

    @Column({default: 'pending'})
    status: 'pending' | 'completed' | 'canceled'

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    orderItems: OrderItem[];

    @Exclude()
    @CreateDateColumn()
    created_at: Date

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date
}
