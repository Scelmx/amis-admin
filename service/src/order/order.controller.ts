import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindAllDto } from './order.dto';
import { assignNewOrderToMachines } from './utils';
import { MachinesService } from '../machines/machines.service';
import * as dayjs from 'dayjs';
import { ObjToArray, returnData, toJSON, toString } from '../utils';
import { PRODUCT_TYPE_MAP, RAW_TYPE_MAP } from '../utils/const';
import { SortInfoService } from '../sortInfo/sortInfo.service';
import { Order } from './order.entity';
import { STATUS_ENUM } from '../sortInfo/sortInfo.entity';
import { MoldService } from '../mold/mold.service';
import { CustomerService } from '../customer/customer.service';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly machinesService: MachinesService,
    private readonly moldService: MoldService,
    private readonly sortInfoService: SortInfoService,
    private readonly customerService: CustomerService,
  ) {}

  @Get('/list')
  async findAll(@Query() query: FindAllDto) {
    const res = await this.orderService.findAll(query);
    
    // 获取所有需要的客户ID
    const customerIds = res.data.map(item => item.customerId).filter(id => id);
    
    // 获取所有模具ID
    const moldIds = res.data.map(item => item.requireMold).filter(id => id);
    
    // 获取客户信息
    const customers = {};
    if (customerIds.length > 0) {
      const customerPromises = customerIds.map(id => this.customerService.getCustomerById(id));
      const customerList = await Promise.all(customerPromises);
      customerList.forEach(customer => {
        if (customer) {
          customers[customer.id] = customer.ctName;
        }
      });
    }
    
    // 获取模具信息
    const molds = {};
    if (moldIds.length > 0) {
      const moldList = await this.moldService.findByIds(moldIds);
      moldList.forEach(mold => {
        molds[mold.id] = { 
          type: mold.produceName,
          name: mold.templateModel
        };
      });
    }
    
    return returnData({
      ...res,
      data: res.data?.map((item) => {
        item.deliveryAt /= 1000;
        
        // 添加客户名称
        if (item.customerId && customers[item.customerId]) {
          // 使用一个临时对象扩展Order
          const extendedItem = item as any;
          extendedItem.customerName = customers[item.customerId];
        }
        
        // 添加模具类型
        if (item.requireMold && molds[item.requireMold]) {
          // 使用一个临时对象扩展Order
          const extendedItem = item as any;
          extendedItem.moldType = molds[item.requireMold].type;
        }
        
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
        // 订单筛选，完成时间在今日之后的
        const order = await this.orderService.findById(orderIds);
        item.orders = item.orders.map((item, index) => {
          if (item.status !== 'finish') {}
          return {
            ...item,
            ...order.find((orderItem) => orderItem.id === item.orderId),
          };
        });
      }
      item.mold = await this.moldService?.findOne(item.mold);
      item.type = toJSON(item.type);
    }
    return machineList;
  }

  /** 查找符合条件的机器 */
  async findTargetMachine(body) {
    const machineList = await this.getAllMachine();
    /** 找到对应业务线 */
    const result = assignNewOrderToMachines(body, machineList);
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
    const mold = await this.moldService.findOne(body.requireMold);
    const data = {
      ...body,
      createdAt: dayjs().valueOf(),
      deliveryAt: body.deliveryAt * 1,
      priority: body?.priority || 2,
      requireMoldName: mold.templateNo,
      mold:mold
    };
    const order = await this.orderService.create(data);
    
    /** 先找到机器 */
    const machineInfo = await this.findTargetMachine(data);
    if(machineInfo.data.machine==null||machineInfo.data.machine.length==0){
      await this.orderService.remove(order.id);
      return returnData(null, machineInfo.msg);
    }
    const index = machineInfo.data.position.index;
    const nOrder = machineInfo.data.position.nOrder;
    if (machineInfo.data.machine) {
      /** 找到可以生产的机器然后创建订单 */
      /** 创建订单排序信息 */
      const sortInfo = await this.sortInfoService.add({
        machineId: machineInfo.data.machine.id,
        orderId: order.id,
        position: index,
        latestStartTime: nOrder[index].latestStartTime,
        startTime: nOrder[index].startTime,
        endTime: nOrder[index].endTime,
        durationTime: nOrder[index].durationTime,
        status:
          index === 0
            ? STATUS_ENUM.process
            : STATUS_ENUM.wait,
        isBlack: 0,
      });

      /** 为什么要这样做, 因为插入机器需要订单ID */
      /** 更新机器订单信息  */
      // const res = insertOrderToMachine({
      //   ...machineInfo.data,
      //   newOrder: order,
      // });
      await this.sortInfoService.updateMany(machineInfo.data.position.nOrder);

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

  @Post('/update/status')
  async update(@Body() body: Order) {
    const order = await this.orderService.update(body);
    const res = await this.sortInfoService.updateByOrderId({
      orderId: body.orderNo,
      status: body.status
    });

    return returnData(res, '业务线查找失败');
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
