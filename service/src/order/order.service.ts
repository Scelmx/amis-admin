import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, FindAllDto, UpdateOrderDto } from './order.dto';
import { camelToSnakeCase, genWhereObj, snakeToCamelCase } from '../utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(camelToSnakeCase(createOrderDto));
    return this.orderRepository.save(order);
  }

  async findAll(query: FindAllDto): Promise<{ count; data: Order[] }> {
    const { customerId, status, ...rest } = query;
    const options = genWhereObj(rest, { customer_id: customerId || undefined, status: status || undefined });
    const count = await this.orderRepository.count(options);
    const data = await this.orderRepository.find(options);
    return { count, data };
  }

  async findOne(id: number): Promise<Order> {
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
