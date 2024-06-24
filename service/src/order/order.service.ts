import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  /** 更新订单 */
  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(updateOrderDto.id, updateOrderDto);
    return this.findOne(updateOrderDto.id);
  }

  /** 标记删除订单 */
  async remove(id: string): Promise<void> {
    await this.orderRepository.update(id, { is_deleted: 1 });
  }
}
