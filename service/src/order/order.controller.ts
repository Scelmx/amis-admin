import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, FindAllDto, UpdateOrderDto } from './order.dto';
import { assignNewOrderToMachines } from './utils';
import { MachinesService } from '../machines/machines.service';
import * as dayjs from 'dayjs';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly machinesService: MachinesService,
  ) {}

  @Get('/list')
  findAll(@Query() query: FindAllDto) {
    return this.orderService.findAll(query);
  }

  @Post('/add')
  async create(@Body() createOrderDto: CreateOrderDto) {
    const res = await this.orderService.create({ ...createOrderDto, createdAt: dayjs().valueOf() });
    console.log(res, '111')
    if (res) {
      const machineList = await this.machinesService.findAll();
      const targetMachine = assignNewOrderToMachines(res, machineList);
      console.log(machineList, targetMachine, '?????')
      const targetLine = await this.machinesService.updateTargetMachineOrders(targetMachine)
      if (targetLine) {
        return res;
      }
      return '未找到对应产线'
    }
    return '订单创建失败'
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
