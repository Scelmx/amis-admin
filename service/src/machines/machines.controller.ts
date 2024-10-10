import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachinesDto, UpdateMachinesDto } from './machines.dto';
import { PRODUCT_TYPE_MAP } from '../utils/const';
import { ObjToArray, returnData } from '../utils';

@Controller('/machines')
export class MachineController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post('/add')
  async create(@Body() createOrderDto: CreateMachinesDto) {
    const res = await this.machinesService.create({
      ...createOrderDto,
      type: JSON.stringify(createOrderDto.type),
    });
    return returnData(res)
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    const res = await this.machinesService.findOne(query.id);
    return returnData(res);
  }

  @Post('/update')
  async update(@Body() updateOrderDto: UpdateMachinesDto) {
    const res = await this.machinesService.update({
      ...updateOrderDto,
      type: JSON.stringify(updateOrderDto.type),
    });
    return returnData(res);
  }

  @Get('/del')
  async remove(@Query() query: { id: number }) {
    const res = await this.machinesService.remove(query.id);
    return returnData(res);
  }

  @Get('/list')
  findAll(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return returnData(type === 'enum' ? PRODUCT_TYPE_MAP : ObjToArray(PRODUCT_TYPE_MAP));
  }
}
