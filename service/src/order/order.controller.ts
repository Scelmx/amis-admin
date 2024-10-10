import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, FindAllDto, UpdateOrderDto } from './order.dto';
import { assignNewOrderToMachines, insertOrderToMachine } from './utils';
import { MachinesService } from '../machines/machines.service';
import * as dayjs from 'dayjs';
import { ObjToArray, returnData, snakeToCamelCase, toJSON, toString } from '../utils';
import { PRODUCT_TYPE_MAP, RAW_TYPE_MAP } from '../utils/const';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly machinesService: MachinesService,
  ) {}

  @Get('/list')
  async findAll(@Query() query: FindAllDto) {
    const res = await this.orderService.findAll(query);
    return returnData({
      ...res,
      data: res.data?.map((item) => {
        item.delivery_at /= 1000;
        return item;
      }),
    });
  }

  @Get('/machines')
  async getMachines() {
    return returnData(await this.getMachinesOrders());
  }

  async getMachinesOrders() {
    const machineList: any = await this.machinesService.findAll();
    for (const item of machineList) {
      const orders = [];
      for (const orderJson of toJSON(item?.orders || '[]')) {
        const orderList = await this.orderService.findOne(orderJson); // 等待这个异步操作完成
        // 假设 orderService.findById 返回的是单个订单对象，你可能需要根据实际情况调整
        orders.push(orderList);
      }
      item.orders = orders;
      item.type = toJSON(item.type);
    }
    return machineList;
  }

  /** 查找符合条件的机器 */
  async findTargetMachine(body) {
    const machineList = await this.getMachinesOrders();
    /** 找到对应业务线 */
    const result = assignNewOrderToMachines(
      snakeToCamelCase(body),
      machineList,
    );
    return result;
  }

  /** 更新指定业务线 */
  async updateTargetMachine(targetMachine) {
    const targetLine = await this.machinesService.updateTargetMachineOrders({
      ...targetMachine,
      type: toString(targetMachine?.type),
    });
    return targetLine;
  }

  @Post('/add')
  async create(@Body() body: CreateOrderDto) {
    const data = {
      ...body,
      createdAt: dayjs().valueOf(),
      deliveryAt: body.deliveryAt * 1,
      priority: body?.priority || 2,
    };

    /** 先找到机器 */
    const machineInfo = await this.findTargetMachine(data);
    if (machineInfo.machine) {
      const res = await this.orderService.create(data);
      const targetLine = insertOrderToMachine({
        ...machineInfo,
        newOrder: res,
      });
      if (res) {
        return returnData(await this.updateTargetMachine(targetLine));
      }
      return returnData(null, '订单创建失败');
    }
    return returnData(null, '未找到对应产线订单分配失败');
  }

  /** 获取产品类型列表 */
  @Get('/product')
  async getProductList(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return returnData(type === 'enum' ? PRODUCT_TYPE_MAP : ObjToArray(PRODUCT_TYPE_MAP));
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    return returnData(await this.orderService.findOne(query.id));
  }

  @Post('/update')
  async update(@Body() body: UpdateOrderDto) {
    if (body.status === 'finish') {
      const { machineId, ...rest } = body;
      await this.orderService.update(rest);
      const res = await this.machinesService.findOne(machineId);
      return returnData(await this.machinesService.update({
        ...res,
        orders: toString(
          toJSON(res.orders || '[]').filter((item) => item !== body.id),
        ),
      }));
    }
    /** 先查找机器信息 */
    const machineInfo = await this.findTargetMachine(body);
    if (machineInfo.machine) {
      await this.orderService.update(body);
      const targetMachine = insertOrderToMachine({
        ...machineInfo,
        newOrder: body,
      });
      return returnData(await this.updateTargetMachine(targetMachine));
    }
    return returnData(null, '业务线查找失败');
  }

  @Get('/del')
  async remove(@Query() query: { id: string }) {
    const res = await this.orderService.remove(query.id);
    return returnData(res); 
  }

  @Get('/rawType')
  async getRawType(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return returnData(type === 'enum' ? RAW_TYPE_MAP : ObjToArray(RAW_TYPE_MAP));
  }
}
