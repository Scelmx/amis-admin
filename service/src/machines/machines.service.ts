import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machines } from './machines.entity';
import { CreateMachinesDto, UpdateMachinesDto } from './machines.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machines)
    private readonly machinesResponsitory: Repository<Machines>,
  ) {}

  async create(createOrderDto: CreateMachinesDto): Promise<Machines> {
    const order = this.machinesResponsitory.create(createOrderDto);
    return this.machinesResponsitory.save(order);
  }

  async findAll(): Promise<Machines[]> {
    return await this.machinesResponsitory.find();
  }

  async findOne(id: string): Promise<Machines> {
    return this.machinesResponsitory.findOneBy({ id });
  }

  /** 更新订单 */
  async update(updateOrderDto: UpdateMachinesDto): Promise<Machines> {
    await this.machinesResponsitory.update(updateOrderDto.id, updateOrderDto);
    return this.findOne(updateOrderDto.id);
  }

  /** 标记删除订单 */
  async remove(id: string): Promise<void> {
    await this.machinesResponsitory.update(id, { is_deleted: 1 });
  }

  /** 更新指定机器 */
  async updateTargetMachineOrders(machine: UpdateMachinesDto) {
    return await this.machinesResponsitory.update(machine.id, machine)
  }
}
