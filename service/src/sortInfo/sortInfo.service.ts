import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortInfo } from './sortInfo.entity';
import { Repository } from 'typeorm';
import { SortInfoDto, FindSortInfoAllDto } from './sortInfo.dto';
import { genWhereObj } from '../utils';

@Injectable()
export class SortInfoService {
  constructor(
    @InjectRepository(SortInfo)
    private SortInfoRepository: Repository<SortInfo>,
  ) {}

  /** 不需要分页 */
  async list(query: FindSortInfoAllDto) {
    return await this.SortInfoRepository.find({ where: query })
  }
  
  /** 删除订单排序信息 */
  async remove(params: SortInfoDto) {
    const {
      id = undefined,
      machineId = undefined,
      orderId = undefined,
    } = params;
    return await this.SortInfoRepository.update(
      {
        id,
        machineId,
        orderId,
      },
      { isDeleted: 1 },
    );
  }

  /** 添加订单排序信息 */
  async add(data: SortInfo): Promise<SortInfo> {
    return await this.SortInfoRepository.save(data);
  }

  /** 更新订单排序信息 */
  async update(params: SortInfoDto) {
    const {
        id = undefined,
        machineId = undefined,
        orderId = undefined,
      } = params;
    return await this.SortInfoRepository.update({
        id,
        machineId,
        orderId,
      }, params);
  }
}
