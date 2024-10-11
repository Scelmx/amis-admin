import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProdInfoService } from '../prodinfo/prodinfo.service';
import { CustomerService } from '../customer/customer.service';
import { Pd, ProductName } from './const';
import { generateRolerance } from './utils';
import {
  ProductDto,
  downloadProductDocxDto,
  getProductListDto,
} from './product.dto';
import {
  convertUndefinedToEmptyString,
  getRandomList,
  renderDataToDocx,
  returnData,
} from '../utils/index';
import * as dayjs from 'dayjs';

@Controller('/product')
export class ProductController {
  constructor(
    private prodInfoService: ProdInfoService,
    private productService: ProductService,
    private customerService: CustomerService,
  ) {}

  @Get('/list')
  async getProducts(@Query() query: getProductListDto) {
    const res = await this.productService.getProductList(query);
    return returnData(res);
  }

  @Get('/typeList')
  getProductTypeList() {
    return returnData([
      {
        label: ProductName.pw,
        value: Pd.pw,
      },
      {
        label: ProductName.oxq,
        value: Pd.oxq,
      },
      {
        label: ProductName.yxq,
        value: Pd.yxq,
      },
    ]);
  }

  @Get('/del')
  async delProduct(@Query() query: { id: number }) {
    const { id } = query;
    const res = await this.productService.removeProduct(id);
    return returnData(res);
  }

  @Get('/download')
  async download(
    @Query() query: downloadProductDocxDto,
    @Res() response: Response,
  ) {
    let res = await this.productService.getProductById(query);
    let customer = await this.customerService.getCustomerById(res.id);
    let prodInfoList = await this.prodInfoService.getProdInfoByType({
      ptype: res.ptype,
    });

    if (!res || !prodInfoList) return '';
    const result = res;
    const docData = generateRolerance(result as unknown as ProductDto);

    prodInfoList = getRandomList(prodInfoList).map((item, index) => {
      const res = item;
      const halfKey = 'half';
      const key = ['size1', 'size2', 'size3'];
      res[key[0]] = docData[key[0] + index].toFixed(3) + '';
      res[halfKey + key[0]] = (docData[key[0] + index] / 2).toFixed(3) + '';
      res[key[1]] = docData[key[1] + index].toFixed(3) + '';
      res[halfKey + key[1]] = (docData[key[1] + index] / 2).toFixed(3) + '';
      res[key[2]] = docData[key[2] + index]
        ? docData[key[2] + index]?.toFixed(3) + ''
        : '';
      return res;
    });

    const obj = {
      ...convertUndefinedToEmptyString(result),
      ...{
        size1Title: `${result.size1}${result.size1Top ? '+' + result.size1Top : ''}/${result.size1Down || ''}`,
        size2Title: result.size2
          ? `${result.size2}${result.size2Top ? '+' + result.size2Top : ''}/${result.size2Down || ''}`
          : '',
        size3Title: result.size3
          ? `${result.size3}${result.size3Top ? '+' + result.size3Top : ''}/${result.size3Down || ''}`
          : '',
      },
    };

    const { filePath, fileName } = renderDataToDocx(
      path.join(
        __dirname,
        `./assets/template/${ProductName[result.ptype]}.docx`,
      ),
      {
        ...docData,
        ...obj,
        ...customer,
        orderNo: result.orderNo.replace(',', '\n'),
        prodInfoList,
        productName: ProductName[result.ptype],
        dateSplitPoint: dayjs().format('YYYY.MM.DD'),
        date: dayjs().format('YYYY年MM月DD日'),
        time: dayjs().format('HH:mm'),
      },
    );

    if (!fs.existsSync(filePath)) {
      return returnData({ msg: '下载失败' });
    }

    // 设置响应头，指定文件名和内容类型
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}.docx"`,
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );

    // 创建文件流并发送响应
    const filestream = fs.createReadStream(filePath);
    filestream.pipe(response);
  }

  @Post('/add')
  async addProduct(@Body() body: Product) {
    const res = await this.productService.addProduct({ ...body });
    return returnData(res);
  }

  @Post('/update')
  async updateProduct(@Body() body: Product) {
    const res = await this.productService.updateProduct(body);
    return returnData(res);
  }
}
