import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list')
  findAll() {
    return this.orderService.findAll();
  }

  @Post('/add')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/find')
  findOne(@Query() query: { id: number }) {
    return this.orderService.findOne(query.id);
  }

  @Post('/update')
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto);
  }

  @Get('/del')
  remove(@Query() query: { id: string }) {
    return this.orderService.remove(query.id);
  }
}
