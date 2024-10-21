import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { MoldService } from './mold.service';
import { CreateWordDto } from './mold.dto';
import { ObjToArray, renderDataToDocx, returnData } from '../utils';
import { FeedStockService } from '../feedstock/feedstock.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createBaseNameObj } from './utils';
import * as dayjs from 'dayjs';
import { MOLD_TYPE_MAP } from '../utils/const';
import { Mold } from './mold.entity';

@Controller('/molds')
export class MoldController {
  constructor(
    private readonly moldService: MoldService,
    private readonly feedstockService: FeedStockService,
  ) {}

  @Post('/add')
  async create(@Body() mold: Mold) {
    const res = await this.moldService.create(mold);
    return returnData(res);
  }

  @Get('/page')
  async page(
    @Query() query: { page: number; pageSize: number; templateModel: string },
  ) {
    const res = await this.moldService.page(query);
    return returnData(res);
  }

  @Get('/list')
  async findAll(@Query() query: { type: 'enum' | 'options' }) {
    const res = await this.moldService.findAll();
    if (query.type === 'enum') {
      return returnData(
        res.reduce((target, item) => {
          target[item.id] = item.produceName;
          return target;
        }, {}),
      );
    }
    return returnData(
      res.map((item) => ({ label: item.produceName, value: item.id })),
    );
  }

  @Post('/createWord')
  async createWord(@Body() body: CreateWordDto) {
    const { templateNo, feedstockId, ...rest } = body;
    const templateNos = templateNo.split(',');
    const feedstockIds = feedstockId.split(',') as unknown as number[];
    /** 获取对应的原料信息 */
    const feedstockInfo = await this.feedstockService.findByIds(feedstockIds);
    if (!feedstockInfo) {
      return returnData(null, '原料信息获取失败')
    }
    /** 获取对应的模具信息 */
    const templateInfo = await this.moldService.findByTemplateNo(templateNos);
    if (!feedstockInfo) {
      return returnData(null, '模具信息获取失败')
    }

    const product2Params = feedstockInfo?.[1] || feedstockInfo[0];
    const product1 = createBaseNameObj('product1', {
      ...feedstockInfo[0],
      ...templateInfo[0],
      count: templateInfo[0].hole * templateInfo[0].mode,
    });
    const product2 = createBaseNameObj('product2', {
      ...product2Params,
      ...templateInfo?.[1],
      count: templateInfo?.[1]?.hole * templateInfo?.[1]?.mode,
    });
    const { filePath, fileName } = renderDataToDocx(
      path.join(__dirname, `./assets/template/mold.docx`),
      {
        ...product1,
        ...product2,
        ...rest,
        createDate: rest?.createDate
          ? dayjs(Number(rest?.createDate) * 1000).format('YYYY-MM-DD')
          : '',
        sailings: rest.sailings === '0',
      },
    );

    if (!fs.existsSync(filePath)) {
      return returnData(null, '文件不存在');
    }
    return returnData(fileName)
  }

  @Get('/download')
  async download(
    @Query() query: { filename: string },
    @Res() response: Response,
  ) {
    const { filename } = query;
    const filePath = path.join(
      __dirname,
      '../dist/assets/output/',
      `${filename}.docx`,
    );
    if (!fs.existsSync(filePath)) {
      return { msg: '下载失败' };
    }
    response.download(filePath);
  }

  @Get('/find')
  async findOne(@Query() query: { id: number }) {
    const res = await this.moldService.findOne(query.id);
    return returnData(res);
  }

  @Post('/update')
  async update(@Body() mold: Mold) {
    const res = await this.moldService.update(mold);
    return returnData(res);
  }

  @Get('/del')
  async remove(@Query() query: { id: number }) {
    const res = await this.moldService.remove(query.id);
    return returnData(res)
  }
}
