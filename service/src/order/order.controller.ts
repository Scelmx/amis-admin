import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindAllDto } from './order.dto';
import { assignNewOrderToMachines } from './utils';
import { MachinesService } from '../machines/machines.service';
import * as dayjs from 'dayjs';
import {
  ObjToArray,
  returnData,
  toJSON,
  toString,
} from '../utils';
import { PRODUCT_TYPE_MAP, RAW_TYPE_MAP } from '../utils/const';
import { SortInfoService } from '../sortInfo/sortInfo.service';
import { Order } from './order.entity';
import { STATUS_ENUM } from '../sortInfo/sortInfo.entity';
import { MoldService } from '../mold/mold.service';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly machinesService: MachinesService,
    private readonly moldService: MoldService,
    private readonly sortInfoService: SortInfoService,
  ) {}

  @Get('/list')
  async findAll(@Query() query: FindAllDto) {
    const res = await this.orderService.findAll(query);
    return returnData({
      ...res,
      data: res.data?.map((item) => {
        item.deliveryAt /= 1000;
        return item;
      }),
    });
  }

  @Get('/machines')
  async getMachines() {
    const res = await this.getAllMachine();
    return returnData(res);
  }

  /** 获取全部机器 */
  async getAllMachine() {
    const machineList: any = await this.machinesService.findAll();
    for await (const item of machineList) {
      const orderIds = item.orders.map((sortInfo) => sortInfo.orderId);
      if (orderIds && orderIds.length) {
        const order = await this.orderService.findById(orderIds)
        item.orders = item.orders.map((item, index) => ({ ...item, ...order[index] }))
      }
      item.mold = await this.moldService?.findOne(item.mold)
      item.type = toJSON(item.type);
    }
    return machineList;
  }

  /** 查找符合条件的机器 */
  async findTargetMachine(body) {
    const machineList = await this.getAllMachine()
    /** 找到对应业务线 */
    const result = assignNewOrderToMachines(
      body,
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
  async create(@Body() body: Order) {
    const data = {
      ...body,
      createdAt: dayjs().valueOf(),
      deliveryAt: body.deliveryAt * 1,
      priority: body?.priority || 2,
    };

    /** 先找到机器 */
    const machineInfo = await this.findTargetMachine(data);
    if (machineInfo.data.machine && machineInfo.data.machine.length) {
      /** 找到可以生产的机器然后创建订单 */
      const order = await this.orderService.create(data);
      /** 创建订单排序信息 */
      const sortInfo = await this.sortInfoService.add({
        machineId: machineInfo.data.machine.id,
        orderId: order.id,
        position: machineInfo.data.position.index,
        status: machineInfo.data.position.index === 0 ? STATUS_ENUM.process : STATUS_ENUM.wait,
        isBlack: 0,
      })
      /** 为什么要这样做, 因为插入机器需要订单ID */
      /** 更新机器订单信息  */
      if (order && sortInfo) {
        return returnData(order);
      }
      return returnData(null, '订单创建失败');
    }
    return returnData(null, '未找到对应产线订单分配失败');
  }

  /** 获取产品类型列表 */
  @Get('/product')
  async getProductList(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return returnData(
      type === 'enum' ? PRODUCT_TYPE_MAP : ObjToArray(PRODUCT_TYPE_MAP),
    );
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    return returnData(await this.orderService.findOne(query.id));
  }

  @Post('/update')
  async update(@Body() body: Order) {
    /** 先查找机器信息 */
    const machineInfo = await this.findTargetMachine(body);
    if (machineInfo.data.machine && machineInfo.data.machine.length) {
      const order = await this.orderService.update(body);
      const sortInfo = await this.sortInfoService.updateByOrderId({
        machineId: machineInfo.data.machine.id,
        orderId: body.id,
        position: machineInfo.data.position.index,
      })

      if (sortInfo && order) {
        return returnData(sortInfo);
      }
      return returnData(null, '自动排班或者订单更新失败')
    }
    return returnData(null, '业务线查找失败');
  }

  @Get('/del')
  async remove(@Query() query: { id: number }) {
    await this.sortInfoService.remove(query.id);
    const res = await this.orderService.remove(query.id);
    return returnData(res);
  }

  @Get('/rawType')
  async getRawType(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return returnData(
      type === 'enum' ? RAW_TYPE_MAP : ObjToArray(RAW_TYPE_MAP),
    );
  }
}
