import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachinesDto, UpdateMachinesDto } from './machines.dto';
import { PRODUCT_TYPE_MAP } from '../utils/const';
import { ObjToArray } from '../utils';

@Controller('/machines')
export class MachineController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post('/add')
  create(@Body() createOrderDto: CreateMachinesDto) {
    return this.machinesService.create({ ...createOrderDto, type: JSON.stringify(createOrderDto.type) });
  }

  @Get('/find')
  findOne(@Query() query: { id: string }) {
    return this.machinesService.findOne(query.id);
  }

  @Post('/update')
  update(@Body() updateOrderDto: UpdateMachinesDto) {
    return this.machinesService.update({ ...updateOrderDto, type: JSON.stringify(updateOrderDto.type) });
  }

  @Get('/del')
  remove(@Query() query: { id: string }) {
    return this.machinesService.remove(query.id);
  }

  @Get('/list')
  findAll(@Query() query: { type: 'enum' | 'options' }) {
    const { type } = query;
    return type === 'enum' ? PRODUCT_TYPE_MAP : ObjToArray(PRODUCT_TYPE_MAP)
  }
}
