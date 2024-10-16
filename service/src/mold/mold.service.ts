import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Mold } from './mold.entity';
import { CreateMoldDto, UpdateMoldDto } from './mold.dto';
import { ListDto } from '../common/common.dto';
import { camelToSnakeCase } from '../utils';

@Injectable()
export class MoldService {
  constructor(
    @InjectRepository(Mold)
    private readonly moldRepository: Repository<Mold>,
  ) {}

  async create(createMoldDto: CreateMoldDto): Promise<Mold> {
    const mold = this.moldRepository.create(camelToSnakeCase(createMoldDto));
    return this.moldRepository.save(mold);
  }

  async findAll(params?: ListDto & { templateModel: string }): Promise<{ count, data: Mold[] }> {
    const { page = 1, pageSize = 10, templateModel = undefined } = params ?? {};
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const where = { 
      is_deleted: 0, 
      template_model: templateModel ? Like(`%${templateModel}%`) : undefined
    }
    const count = await this.moldRepository.count({ where });
    const data = await this.moldRepository.find({ where, order: { id: 'DESC' }, skip, take: pageSize });
    return { count, data }
  }

  async findOne(id: number): Promise<Mold> {
    return await this.moldRepository.findOneBy({ id, is_deleted: 0 });
  }

  /** 查找模版编号 */
  async findByTemplateNo(templateNo: string[]): Promise<Mold[]> {
    const where = {
      template_no: In(templateNo),
      is_deleted: 0
    }
    return await this.moldRepository.find({ where: where });
  }

  /**
   * @param updateMoldDto 模具信息
   * @returns 
   */
  async update(updateMoldDto: UpdateMoldDto): Promise<Mold> {
    await this.moldRepository.update(
      updateMoldDto.id,
      camelToSnakeCase(updateMoldDto),
    );
    return await this.findOne(updateMoldDto.id);
  }

  /** 删除指定 ID 的模具 */
  async remove(id: number) {
    return await this.moldRepository.update(id, { is_deleted: 1 });
  }
}
