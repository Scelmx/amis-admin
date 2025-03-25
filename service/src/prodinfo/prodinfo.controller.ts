import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProdInfoService } from './prodinfo.service';
import { PageDto } from './prodinfo.dto';
import { ProdInfo } from './prodinfo.entity';
import { returnData } from '../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from '../injectable/upload';

@Controller('/prodinfo')
export class ProdInfoController {
    constructor(private prodInfoService: ProdInfoService) {}

    @Get('/list')
    async getProdInfoList(@Query() query: PageDto) {
        return returnData(await this.prodInfoService.getProdInfoList(query));
    }

    @Get('/del')
    async delProdInfo(@Query() query: { id: number }) {
        const { id } = query;
        const res = await this.prodInfoService.removeProdInfo(id);
        if (res) {
            return returnData(null, '删除成功')
        }
        return returnData(null, '删除失败')
    }

    @Post('/update')
    async updateProdInfo(@Body() body: ProdInfo) {
        const res = await this.prodInfoService.updateProdInfo(body)
        return returnData(res);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', getMulterConfig()))
    async uploadProdInfo(@UploadedFile() file) {
        return returnData({
            filename: file.filename,
            url: `http://localhost:3000/uploads/${file.filename}`,
            value: `http://localhost:3000/uploads/${file.filename}`
        })
    }

    @Post('/add')
    async addProdInfo(@Body() body: ProdInfo) {
        const res = await this.prodInfoService.addProdInfo(body)
        return returnData(res)
    }
}
