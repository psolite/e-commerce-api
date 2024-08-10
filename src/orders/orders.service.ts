import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from 'src/products/products.service';
import { instanceToInstance, instanceToPlain } from 'class-transformer';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly productService: ProductsService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { customerName, customerEmail, customerAddress, customerPhone, orderItems } = createOrderDto;
    try {
      console.log("order")
      // Create the order
      const order = this.orderRepository.create({
        customerName,
        customerEmail,
        customerAddress,
        customerPhone
      });
      await this.orderRepository.save(order);
      console.log("OrderItems")
      // Create order items
      for (const item of orderItems) {
        // Fetch the product from the database
        const product = await this.productService.findOne(item.productId);
        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found`);
        }
        const orderItem = this.orderItemRepository.create({
          productId: item.productId,
          quantity: item.quantity,
          priceAtOrder: product.price,
          order,
        });
        await this.orderItemRepository.save(orderItem);
      }

      return instanceToPlain(this.orderRepository.find({
        where: { id: order.id },
        relations: ['orderItems']
      }))
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }


  async findAll(): Promise<Order[]> {
    const orders = this.orderRepository.find({ relations: ['orderItems', 'orderItems.product'] });
    return instanceToInstance(orders)
  }

  async findOne(id: number): Promise<Order> {
    const order = this.orderRepository.findOne({
      where: { id },
      relations: ['orderItems', 'orderItems.product']
    });
    return instanceToInstance(order)
  }


}
