import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { MoldService } from './mold.service';
import { CreateMoldDto, CreateWordDto, UpdateMoldDto } from './mold.dto';
import { renderDataToDocx, snakeToCamelCase } from '../utils';
import { FeedStockService } from '../feedstock/feedstock.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createBaseNameObj } from './utils';

@Controller('/molds')
export class MoldController {
  constructor(
    private readonly moldService: MoldService,
    private readonly feedstockService: FeedStockService,
  ) {}

  @Post('/add')
  create(@Body() createMoldDto: CreateMoldDto) {
    return this.moldService.create(createMoldDto);
  }

  @Get('/list')
  findAll(
    @Query() query: { page: number; pageSize: number; templateModel: string },
  ) {
    return this.moldService.findAll(query);
  }

  @Post('/createWord')
  async createWord(@Body() body: CreateWordDto) {
    const { templateNo, feedstockId, ...rest } = body;
    const templateNos = templateNo.split(',');
    const feedstockIds = feedstockId.split(',');
    /** 获取对应的原料信息 */
    const feedstockInfo = await this.feedstockService.findByIds(feedstockIds);
    if (!feedstockInfo) {
      return {
        data: '原料信息获取失败',
      };
    }
    /** 获取对应的模具信息 */
    const templateInfo = await this.moldService.findByTemplateNo(templateNos);
    if (!feedstockInfo) {
      return {
        data: '模具信息获取失败',
      };
    }
    const product1 = createBaseNameObj('product1', { ...feedstockInfo[0], ...templateInfo[0], count: templateInfo[0].hole * templateInfo[0].mode })
    const product2 = createBaseNameObj('product2', { ...feedstockInfo[1], ...templateInfo[1], count: templateInfo[1].hole * templateInfo[1].mode })
    const { filePath, fileName } = renderDataToDocx(
      path.join(__dirname, `./assets/template/mold.docx`),
      {
        ...snakeToCamelCase(product1),
        ...snakeToCamelCase(product2),
        ...rest,
        sailings: rest.sailings === '0'
      },
    );

    if (!fs.existsSync(filePath)) {
      return '文件不存在';
    }

    return { data: fileName }
  }

  @Get('/download')
  async download(
    @Query() query: { filename: string },
    @Res() response: Response,
  ) {
    const { filename } = query;
    const filePath = path.join(__dirname, '../dist/assets/output/', `${filename}.docx`);
    if (!fs.existsSync(filePath)) {
      return '下载失败';
    }
    response.download(filePath);
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
