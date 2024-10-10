import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  mold: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '关联订单',
    nullable: true,
  })
  orders: string;
}
