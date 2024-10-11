import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { FindAllDto } from './order.dto';
import { genWhereObj } from '../utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
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
  async update(order: Order) {
    return await this.orderRepository.update(order.id, order);
  }

  /** 标记删除订单 */
  async remove(id: number) {
    return await this.orderRepository.update(id, { isDeleted: 1 });
  }
}
