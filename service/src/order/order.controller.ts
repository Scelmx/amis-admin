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

  @Get('/machines')
  async getMachines() {
    const machineList: any = await this.machinesService.findAll();
    console.log(machineList, 111);
    for (const item of machineList) {
      const orders = [];
      for (const orderJson of JSON.parse(item?.orders || '[]')) {
        const orderList = await this.orderService.findOne(orderJson); // 等待这个异步操作完成
        // 假设 orderService.findById 返回的是单个订单对象，你可能需要根据实际情况调整
        orders.push(orderList);
      }
      console.log(orders, 'orders')
      item.orders = orders;
    }
    console.log(machineList, 'machineList');
    return machineList;
  }

  @Post('/add')
  async create(@Body() body: CreateOrderDto) {
    const res = await this.orderService.create({
      ...body,
      createdAt: dayjs().valueOf(),
      deliveryAt: body.deliveryAt * 1
    });
    console.log(res, '111');
    if (res) {
      const machineList = await this.machinesService.findAll();
      const targetMachine = assignNewOrderToMachines(res, machineList);
      console.log(machineList, targetMachine, '?????');
      const targetLine =
        await this.machinesService.updateTargetMachineOrders(targetMachine);
      if (targetLine) {
        return res;
      }
      return '未找到对应产线';
    }
    return '订单创建失败';
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
