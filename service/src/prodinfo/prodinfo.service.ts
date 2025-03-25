import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdInfo } from './prodinfo.entity';
import { Repository } from 'typeorm';
import { ListDto } from '../common/common.dto';
import { genWhereObj } from '../utils';

@Injectable()
export class ProdInfoService {
    constructor(
        @InjectRepository(ProdInfo)
        private imagesRepository: Repository<ProdInfo>,
    ) {}

    /** 获取全部图片列表 */
    async getProdInfoList(params: ListDto & { ptype: string }): Promise<{ count, data: ProdInfo[] }> {
        const { ptype, ...otherParams } = params;
        const where = genWhereObj(otherParams, { ptype });
        const count = await this.imagesRepository.count(where);
        const data = await this.imagesRepository.find(where);
        return { count, data }
    }

    /** 通过类型查找图片 */
    async getProdInfoByType(where: Pick<ProdInfo, 'ptype'>): Promise<ProdInfo[]> {
        const opt = where.ptype === 'oxq' ? where : [{ ptype: 'yxq', isDeleted: 0 }, { ptype: 'pw', isDeleted: 0 }]
        return await this.imagesRepository.find({ where: opt });
    }

    /** 标记删除客户 */
    async removeProdInfo(id: number) {
        return await this.imagesRepository.update({ id }, { isDeleted: 1 })
    }

    /** 添加图片 */
    async addProdInfo(images: ProdInfo): Promise<ProdInfo> {
        return await this.imagesRepository.save(images);
    }

    async updateProdInfo(images: ProdInfo) {
        return await this.imagesRepository.update(images.id, images)
    }
}
