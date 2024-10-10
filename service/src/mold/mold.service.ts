import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Mold } from './mold.entity';
import { CreateMoldDto, UpdateMoldDto } from './mold.dto';
import { ListDto } from '../common/common.dto';
import { camelToSnakeCase, genWhereObj } from '../utils';

@Injectable()
export class MoldService {
  constructor(
    @InjectRepository(Mold)
    private readonly moldRepository: Repository<Mold>,
  ) {}

  async create(createMoldDto: CreateMoldDto): Promise<Mold> {
    const mold = this.moldRepository.create(camelToSnakeCase(createMoldDto));
    return await this.moldRepository.save(mold);
  }

  async findAll() {
    return await this.moldRepository.find({ where: { isDeleted: 0 } });
  }

  async page(params?: ListDto & { templateModel: string }): Promise<{ count; data: Mold[] }> {
    const { templateModel = undefined, ...otherParams } = params ?? {};
    const where = genWhereObj(otherParams as ListDto, {
        templateModel: templateModel ? Like(`%${templateModel}%`) : undefined,
      },
    );
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
      template_no: In(templateNo),
      isDeleted: 0,
    };
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
    return await this.moldRepository.update(id, { isDeleted: 1 });
  }
}
