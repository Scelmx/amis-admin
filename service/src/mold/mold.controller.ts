import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { MoldService } from './mold.service';
import { CreateMoldDto, CreateWordDto, UpdateMoldDto } from './mold.dto';
import { renderDataToDocx, snakeToCamelCase } from '../utils';
import { FeedStockService } from '../feedstock/feedstock.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('/molds')
export class MoldController {
  constructor(
    private readonly moldService: MoldService,
    private feedstockService: FeedStockService,
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
  async createWord(@Body() body: CreateWordDto, @Res() response: Response) {
    const { templateNo, feedstockId, sailings } = body;
    let templateNos = [];
    if (Array.isArray(templateNo)) {
      templateNos = templateNo
    } else {
      templateNos = templateNo.split(",")
    }
    /** 获取对应的原料信息 */
    const feedstockInfo = await this.feedstockService.findOne(feedstockId);
    if (feedstockInfo) {
      return {
        data: '原料信息获取失败',
      };
    }
    /** 获取对应的模具信息 */
    const templateInfo = await this.moldService.findOneByTemplateNo(templateNo);
    if (feedstockInfo) {
      return {
        data: '模具信息获取失败',
      };
    }
    const { filePath, fileName } = renderDataToDocx(
      path.join(__dirname, `./assets/template/mold.docx`),
      {
        ...snakeToCamelCase(feedstockInfo),
        ...snakeToCamelCase(templateInfo),
      },
    );

    if (!fs.existsSync(filePath)) {
      return false;
    }

    // 设置响应头，指定文件名和内容类型
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="生产记录.docx"`,
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );

    // 创建文件流并发送响应
    const filestream = fs.createReadStream(filePath);
    filestream.pipe(response);
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
