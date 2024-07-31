import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FeedStock } from './feedstock.entity';
import { CreateFeedStockDto, UpdateFeedStockDto } from './feedstock.dto';
import { ListDto } from '../common/common.dto';
import { camelToSnakeCase } from '../utils';

@Injectable()
export class FeedStockService {
  constructor(
    @InjectRepository(FeedStock)
    private readonly feedStockResponsitory: Repository<FeedStock>,
  ) {}

  async create(createFeedStockDto: CreateFeedStockDto): Promise<FeedStock> {
    const order = this.feedStockResponsitory.create(camelToSnakeCase(createFeedStockDto));
    return this.feedStockResponsitory.save(order);
  }

  async findAll(params?: ListDto): Promise<{ count, data: FeedStock[] }> {
    const { page = 1, pageSize = 10 } = params ?? {};
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const where = { 
      is_deleted: 0
    }
    const count = await this.feedStockResponsitory.count({ where });
    const data = await this.feedStockResponsitory.find({ where, order: { id: 'DESC' }, skip, take: pageSize });
    return { count, data }
  }

  async findByIds(ids: string[]): Promise<FeedStock[]> {
    const where = { id: In(ids), is_deleted: 0 };
    const res = await this.feedStockResponsitory.find({ where: where });
    return res
  }

  async findById(id: string): Promise<FeedStock> {
    return this.feedStockResponsitory.findOneBy({ id });
  }

  /** 更新订单 */
  async update(updateFeedStockDto: UpdateFeedStockDto): Promise<FeedStock> {
    await this.feedStockResponsitory.update(updateFeedStockDto.id, camelToSnakeCase(updateFeedStockDto));
    return this.findById(updateFeedStockDto.id);
  }

  /** 标记删除订单 */
  async remove(id: string) {
    return await this.feedStockResponsitory.update(id, { is_deleted: 1 });
  }
}
