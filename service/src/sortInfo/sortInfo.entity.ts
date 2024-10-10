import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum STATUS_ENUM {
  /** 等待中 */
  'wait' = 'wait',
  /** 生产中 */
  'process' = 'process',
  /** 已完成 */
  'finish' = 'finish',
}

@Entity()
export class SortInfo extends Common {
  @Column({ name: 'machine_id', comment: '机器id' })
  machineId: number;

  @Column({ name: 'order_id', comment: '订单id' })
  orderId: number;

  @Column({ name: 'position', comment: '位置' })
  position: number;

  @Column({
    name: 'is_black',
    comment: '是否夜班 0: 夜班, 1: 白班',
  })
  isBlack: number;
  
  @Column({
    name: 'status',
    comment: '状态',
    type: 'enum',
    enum: STATUS_ENUM
  })
  status: string;
}
