import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, FindAllDto, UpdateOrderDto } from './order.dto';
import { camelToSnakeCase, genWhereObj } from '../utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(camelToSnakeCase(createOrderDto));
    return await this.orderRepository.save(order);
  }

  async findAll(query: FindAllDto): Promise<{ count; data: Order[] }> {
    const { customerId, status, ...rest } = query;
    const options = genWhereObj(rest, { customerId: customerId || undefined, status: status || undefined });
    const count = await this.orderRepository.count(options);
    const data = await this.orderRepository.find(options);
    return { count, data };
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOneBy({ id });
  }

  async findById(ids: number[]): Promise<Order[]> {
    const placeholders = ids?.map(() => '?').join(', ');
    const query = `
      WITH OrderedIds AS (
        SELECT id, 
               ROW_NUMBER() OVER (ORDER BY FIELD(id, ${placeholders})) as rownum
        FROM orders
        WHERE id IN (${placeholders})
      )
      SELECT * FROM OrderedIds
      ORDER BY rownum;
    `;
    return await this.orderRepository.query(query, ids);
  }

  /** 更新订单 */
  async update(updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(updateOrderDto.id, updateOrderDto);
  }

  /** 标记删除订单 */
  async remove(id: number) {
    return await this.orderRepository.update(id, { isDeleted: 1 });
  }
}
