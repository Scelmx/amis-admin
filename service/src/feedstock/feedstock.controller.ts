import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FeedStockService } from './feedstock.service';
import { CreateFeedStockDto, UpdateFeedStockDto } from './feedstock.dto';

@Controller('/feedStock')
export class FeedStockController {
  constructor(private readonly feedStockService: FeedStockService) {}

  @Get('/list')
  findAll(@Query() query: { page: number; pageSize: number }) {
    return this.feedStockService.findAll(query);
  }

  @Get('/options')
  async findOptions(@Query() query: { isMap?: number }) {
    const list = await this.feedStockService.findAll();
    if (query.isMap) {
      return list.data.map((item) => {
        return { [item.id]: item.name };
      });
    }
    return list.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }

  @Post('/add')
  create(@Body() createOrderDto: CreateFeedStockDto) {
    return this.feedStockService.create(createOrderDto);
  }

  @Get('/find')
  findOne(@Query() query: { id: string }) {
    return this.feedStockService.findOne(query.id);
  }

  @Post('/update')
  update(@Body() updateOrderDto: UpdateFeedStockDto) {
    return this.feedStockService.update(updateOrderDto);
  }

  @Get('/del')
  remove(@Query() query: { id: string }) {
    return this.feedStockService.remove(query.id);
  }
}
