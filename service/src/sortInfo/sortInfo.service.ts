import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortInfo } from './sortInfo.entity';
import { Repository } from 'typeorm';
import {
  SortInfoDto,
  FindSortInfoAllDto,
  UpdateSortInfoDto,
} from './sortInfo.dto';

@Injectable()
export class SortInfoService {
  constructor(
    @InjectRepository(SortInfo)
    private SortInfoRepository: Repository<SortInfo>,
  ) {}

  async findOne(params: SortInfoDto) {
    const {
      id = undefined,
      machineId = undefined,
      orderId = undefined,
    } = params;
    return await this.SortInfoRepository.findOne({
      where: {
        id,
        machineId,
        orderId,
      },
    });
  }

  /** 不需要分页 */
  async list(query: FindSortInfoAllDto) {
    return await this.SortInfoRepository.find({ where: query });
  }

  /** 删除订单排序信息 */
  async remove(orderId: number) {
    return await this.SortInfoRepository.update(orderId, { isDeleted: 1 });
  }

  /** 添加订单排序信息 */
  async add(data: UpdateSortInfoDto): Promise<SortInfo> {
    return await this.SortInfoRepository.save(data);
  }

  /** 更新订单排序信息 */
  async updateByOrderId(params: UpdateSortInfoDto) {
    const { orderId } = params;
    return await this.SortInfoRepository.update({ orderId }, params);
  }
}
