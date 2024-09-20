import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, FindAllDto, UpdateOrderDto } from './order.dto';
import { assignNewOrderToMachines } from './utils';
import { MachinesService } from '../machines/machines.service';
import * as dayjs from 'dayjs';
import { snakeToCamelCase } from '../utils';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly machinesService: MachinesService,
  ) {}

  @Get('/list')
  async findAll(@Query() query: FindAllDto) {
    const res = await this.orderService.findAll(query);
    return {
      ...res,
      data: res.data?.map((item) => {
        item.delivery_at /= 1000;
        return item;
      }),
    };
  }

  @Get('/machines')
  async getMachines() {
    return await this.getMachinesOrders()
  }

  async getMachinesOrders() {
    const machineList: any = await this.machinesService.findAll();
    for (const item of machineList) {
      const orders = [];
      for (const orderJson of JSON.parse(item?.orders || '[]')) {
        const orderList = await this.orderService.findOne(orderJson); // 等待这个异步操作完成
        // 假设 orderService.findById 返回的是单个订单对象，你可能需要根据实际情况调整
        orders.push(orderList);
      }
      console.log(orders, 'orders');
      item.orders = orders;
    }
    return machineList
  }
  
  /** 更新机器对应的订单 */
  async updateMachineOrder(body) {
    const machineList = await this.getMachinesOrders()
    const targetMachine = assignNewOrderToMachines(
      snakeToCamelCase(body),
      machineList,
    );
    const targetLine =
        await this.machinesService.updateTargetMachineOrders(targetMachine);
    return targetLine;
  }

  @Post('/add')
  async create(@Body() body: CreateOrderDto) {
    const res = await this.orderService.create({
      ...body,
      createdAt: dayjs().valueOf(),
      deliveryAt: body.deliveryAt * 1,
      priority: body?.priority || 2,
    });
    if (res) {
      const targetLine = this.updateMachineOrder(res)
      if (targetLine) {
        return res;
      }
      return '未找到对应产线';
    }
    return '订单创建失败';
  }

  /** 获取产品类型列表 */
  @Get('/product')
  async getProductList() {
    const machineList = await this.machinesService.findAll();
    const list = machineList
      .map((item) => item.type)
      .filter((item, index, arr) => arr.indexOf(item) === index);
    return list.map((item) => ({
      label: item,
      value: item,
    }));
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    return await this.orderService.findOne(query.id);
  }

  @Post('/update')
  async update(@Body() body: UpdateOrderDto) {
    const res = await this.updateMachineOrder(body)
    if (res) {
      return await this.orderService.update(body);
    }
    return '未找到对应产线';
  }

  @Get('/del')
  async remove(@Query() query: { id: string }) {
    return await this.orderService.remove(query.id);
  }
}
