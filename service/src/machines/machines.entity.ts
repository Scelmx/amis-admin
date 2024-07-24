import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Machines {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '孔数' })
  hole: number;

  @Column({ comment: '额定模数' })
  mode: number;

  /**
   * 产线类型 ['A+B', 'A+C']
   */
  @Column({ comment: '产线类型' })
  type: string;

  @Column({ type: 'varchar', length: 255, comment: '关联订单' })
  orders: string

  @Column({ default: 0, comment: '是否删除' })
  is_deleted?: number;
}
