import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FeedStock } from './feedstock.entity';
import { CreateFeedStockDto, UpdateFeedStockDto } from './feedstock.dto';
import { ListDto } from '../common/common.dto';
import { camelToSnakeCase, genWhereObj } from '../utils';

@Injectable()
export class FeedStockService {
  constructor(
    @InjectRepository(FeedStock)
    private readonly feedStockResponsitory: Repository<FeedStock>,
  ) {}

  async create(createFeedStockDto: CreateFeedStockDto): Promise<FeedStock> {
    const order = this.feedStockResponsitory.create(camelToSnakeCase(createFeedStockDto));
    return await this.feedStockResponsitory.save(order);
  }

  async findAll(params?: ListDto): Promise<{ count, data: FeedStock[] }> {
    const where = genWhereObj(params)
    const count = await this.feedStockResponsitory.count(where);
    const data = await this.feedStockResponsitory.find(where);
    return { count, data }
  }

  async findByIds(ids: number[]): Promise<FeedStock[]> {
    const where = { id: In(ids), isDeleted: 0 };
    const res = await this.feedStockResponsitory.find({ where: where });
    return res
  }

  async findById(id: number): Promise<FeedStock> {
    return await this.feedStockResponsitory.findOneBy({ id });
  }

  /** 更新订单 */
  async update(updateFeedStockDto: UpdateFeedStockDto): Promise<FeedStock> {
    await this.feedStockResponsitory.update(updateFeedStockDto.id, camelToSnakeCase(updateFeedStockDto));
    return await this.findById(updateFeedStockDto.id);
  }

  /** 标记删除订单 */
  async remove(id: number) {
    return await this.feedStockResponsitory.update(id, { isDeleted: 1 });
  }
}
