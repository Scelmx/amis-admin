import {
    Controller,
    Get,
    Post,
    Body,
    Query,
  } from '@nestjs/common';
  import { MachinesService } from './machines.service';
  import { CreateMachinesDto, UpdateMachinesDto } from './machines.dto';
  
  @Controller('/order')
  export class MachineController {
    constructor(private readonly machinesService: MachinesService) {}
  
    @Get('/list')
    findAll() {
      return this.machinesService.findAll();
    }
  
    @Post('/add')
    create(@Body() createOrderDto: CreateMachinesDto) {
      return this.machinesService.create(createOrderDto);
    }
  
    @Get('/find')
    findOne(@Query() query: { id: string }) {
      return this.machinesService.findOne(query.id);
    }
  
    @Post('/update')
    update(@Body() updateOrderDto: UpdateMachinesDto) {
      return this.machinesService.update(updateOrderDto);
    }
  
    @Get('/del')
    remove(@Query() query: { id: string }) {
      return this.machinesService.remove(query.id);
    }
  }
  