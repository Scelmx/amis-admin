import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machines } from './machines.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machines)
    private readonly machinesResponsitory: Repository<Machines>,
  ) {}

  async create(machine: Machines): Promise<Machines> {
    return await this.machinesResponsitory.save(machine);
  }

  async findAll(): Promise<Machines[]> {
    return await this.machinesResponsitory.find({ where: { isDeleted: 0 } });
  }

  async findOne(id: number): Promise<Machines> {
    return await this.machinesResponsitory.findOneBy({ id });
  }

  /** 更新订单 */
  async update(machine: Machines){
    return await this.machinesResponsitory.update(machine.id, machine);
  }

  /** 标记删除订单 */
  async remove(id: number): Promise<void> {
    await this.machinesResponsitory.update(id, { isDeleted: 1 });
  }

  /** 更新指定机器 */
  async updateTargetMachineOrders(machine: Machines) {
    return await this.machinesResponsitory.update(machine?.id, machine)
  }
}
