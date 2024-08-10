import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Exclude } from "class-transformer";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number

    @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    productId: number

    @ManyToOne(() => Product, (product) => product.orderItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    priceAtOrder: number;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}