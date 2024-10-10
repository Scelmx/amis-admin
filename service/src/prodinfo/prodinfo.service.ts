import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdInfo } from './prodinfo.entity';
import { Repository } from 'typeorm';
import { ListDto } from '../common/common.dto';

@Injectable()
export class ProdInfoService {
    constructor(
        @InjectRepository(ProdInfo)
        private imagesRepository: Repository<ProdInfo>,
    ) {}

    /** 获取全部图片列表 */
    async getProdInfoList(where: ListDto & { ptype: string }): Promise<{ count, data: ProdInfo[] }> {
        const { page, pageSize, ptype } = where; 
        const skip = page > 0 ? (page - 1) * pageSize : 0;
        const count = await this.imagesRepository.count({ where: { is_deleted: 0 , ptype }});
        const data = await this.imagesRepository.find({ where: { is_deleted: 0, ptype }, order: { id: 'DESC' }, skip, take: pageSize });
        return { count, data }
    }

    /** 通过类型查找图片 */
    async getProdInfoByType(where: Pick<ProdInfo, 'ptype'>): Promise<ProdInfo[]> {
        const opt = where.ptype === 'oxq' ? where : [{ ptype: 'yxq', is_deleted: 0 }, { ptype: 'pw', is_deleted: 0 }]
        return await this.imagesRepository.find({ where: opt });
    }

    /** 标记删除客户 */
    async removeProdInfo(id: number) {
        return await this.imagesRepository.update({ id }, { is_deleted: 1 })
    }

    /** 添加图片 */
    async addProdInfo(images: ProdInfo): Promise<ProdInfo> {
        return await this.imagesRepository.save(images);
    }

    async updateProdInfo(images: ProdInfo) {
        return await this.imagesRepository.update(images.id, images)
    }
}
