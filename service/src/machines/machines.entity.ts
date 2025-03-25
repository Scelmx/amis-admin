import { SortInfo } from '../sortInfo/sortInfo.entity';
import { Common } from '../common/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Machines extends Common {
  @Column({ comment: '名称' })
  name: string;
  /**
   * 产线类型 ['A+B', 'A+C']
   */
  @Column({ comment: '产线类型' })
  type: string;

  @Column({ comment: '模具信息', nullable: true })
  mold: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '关联订单',
    nullable: true,
  })
  @OneToMany(() => SortInfo, (sort) => sort.machineId)
  orders: Array<SortInfo>;
}
