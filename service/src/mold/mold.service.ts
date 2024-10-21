import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Mold } from './mold.entity';
import { ListDto } from '../common/common.dto';
import { genWhereObj } from '../utils';

@Injectable()
export class MoldService {
  constructor(
    @InjectRepository(Mold)
    private readonly moldRepository: Repository<Mold>,
  ) {}

  async create(mold: Mold): Promise<Mold> {
    return await this.moldRepository.save(mold);
  }

  async findAll() {
    return await this.moldRepository.find({ where: { isDeleted: 0 } });
  }

  async page(
    params?: ListDto & { templateModel: string },
  ): Promise<{ count; data: Mold[] }> {
    const { templateModel = undefined, ...otherParams } = params ?? {};
    const where = genWhereObj(otherParams as ListDto, {
      templateModel: templateModel ? Like(`%${templateModel}%`) : undefined,
    });
    const count = await this.moldRepository.count(where);
    const data = await this.moldRepository.find(where);
    return { count, data };
  }

  async findOne(id: number): Promise<Mold> {
    return await this.moldRepository.findOneBy({ id, isDeleted: 0 });
  }

  /** 查找模版编号 */
  async findByTemplateNo(templateNo: string[]): Promise<Mold[]> {
    const where = {
      templateNo: In(templateNo),
      isDeleted: 0,
    };
    return await this.moldRepository.find({ where: where });
  }

  /**
   * @param mold 模具信息
   * @returns
   */
  async update(mold: Mold) {
    return await this.moldRepository.update(mold.id, mold);
  }

  /** 删除指定 ID 的模具 */
  async remove(id: number) {
    return await this.moldRepository.update(id, { isDeleted: 1 });
  }
}
