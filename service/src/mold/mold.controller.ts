import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoldService } from './mold.service';
import { CreateMoldDto, UpdateMoldDto } from './mold.dto';
import { camelToSnakeCase } from 'src/utils';

@Controller('/molds')
export class MoldController {
  constructor(private readonly moldService: MoldService) {}

  @Post('/add')
  create(@Body() createMoldDto: CreateMoldDto) {
    return this.moldService.create(createMoldDto);
  }

  @Get('/list')
  findAll(@Query() query: { page: number; pageSize: number, templateModel: string }) {
    return this.moldService.findAll(query);
  }

  @Get('/find')
  findOne(@Query() query: { id: number }) {
    return this.moldService.findOne(query.id);
  }

  @Post('/update')
  update(@Body() updateMoldDto: UpdateMoldDto) {
    return this.moldService.update(updateMoldDto);
  }

  @Get('/del')
  remove(@Query() query: { id: number }) {
    return this.moldService.remove(query.id);
  }
}
