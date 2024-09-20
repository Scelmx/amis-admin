import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProdInfoService } from './prodinfo.service';
import { ProdInfoDto } from './prodinfo.dto';
import { ListDto } from '../common/common.dto';
import { ProdInfo } from './prodinfo.entity';
import { camelToSnakeCase } from '../utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from '../injectable/upload';

@Controller('/prodinfo')
export class ProdInfoController {
    constructor(private prodInfoService: ProdInfoService) {}

    @Get('/list')
    async getProdInfoList(@Query() query: { ptype: string } & ListDto) {
        return await this.prodInfoService.getProdInfoList(query);
    }

    @Get('/del')
    async delProdInfo(@Query() query: { id: number }) {
        const { id } = query;
        const res = await this.prodInfoService.removeProdInfo(id);
        if (res) {
            return {}
        }
        return ''
    }

    @Post('/update')
    async updateProdInfo(@Body() body: ProdInfoDto) {
        const image = { ...camelToSnakeCase(body) }
        return await this.prodInfoService.updateProdInfo(image as ProdInfo);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', getMulterConfig()))
    async uploadProdInfo(@UploadedFile() file) {
        return {
            filename: file.filename,
            url: `http://localhost:3000/uploads/${file.filename}`,
            value: `http://localhost:3000/uploads/${file.filename}`
        }
    }

    @Post('/add')
    async addProdInfo(@Body() body: ProdInfoDto) {
        const image = { ...camelToSnakeCase(body) }
        return await this.prodInfoService.addProdInfo(image as ProdInfo)
    }
}
