import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FeedStockService } from './feedstock.service';
import { returnData } from '../utils';
import { FeedStock } from './feedstock.entity';

@Controller('/feedStock')
export class FeedStockController {
  constructor(private readonly feedStockService: FeedStockService) {}

  @Get('/list')
  async findAll(@Query() query: { page: number; pageSize: number }) {
    const res = await this.feedStockService.findAll(query);
    return returnData(res);
  }

  @Get('/options')
  async findOptions(@Query() query: { isMap?: number }) {
    const list = await this.feedStockService.findAll();
    if (query.isMap) {
      return returnData(
        list.data.map((item) => {
          return { [item.id]: item.name };
        }),
      );
    }
    return returnData(
      list.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }),
    );
  }

  @Post('/add')
  async create(@Body() feedStock: FeedStock) {
    const res = await this.feedStockService.create(feedStock);
    return returnData(res);
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    const res = await this.feedStockService.findById(query.id);
    return returnData(res);
  }

  @Post('/update')
  async update(@Body() feedStock: FeedStock) {
    const res = await this.feedStockService.update(feedStock);
    return returnData(res)
  }

  @Get('/del')
  async remove(@Query() query: { id: number }) {
    const res = await this.feedStockService.remove(query.id);
    return returnData(res);
  }
}
