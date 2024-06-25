import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mold } from './mold.entity';
import { CreateMoldDto, UpdateMoldDto } from './mold.dto';

@Injectable()
export class MoldService {
  constructor(
    @InjectRepository(Mold)
    private readonly moldRepository: Repository<Mold>,
  ) {}

  async create(createMoldDto: CreateMoldDto): Promise<Mold> {
    const mold = this.moldRepository.create(createMoldDto);
    return this.moldRepository.save(mold);
  }

  async findAll(): Promise<Mold[]> {
    return this.moldRepository.find();
  }

  async findOne(id: number): Promise<Mold> {
    return this.moldRepository.findOneBy({ id });
  }

  async update(updateMoldDto: UpdateMoldDto): Promise<Mold> {
    await this.moldRepository.update(updateMoldDto.id, updateMoldDto);
    return this.findOne(updateMoldDto.id);
  }

  async remove(id: number): Promise<void> {
    await this.moldRepository.delete(id);
  }
}
