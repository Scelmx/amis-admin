import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '订单号', nullable: true })
  order_no: string;

  @Column({ comment: '客户' })
  customer_id: number;

  @Column({ comment: '产品类型' })
  product_type: string;

  @Column({ comment: '商品名称', nullable: true })
  goods_name: string;

  @Column({ comment: '商品型号', nullable: true })
  goods_model: string;

  @Column({ type: 'bigint', comment: '交付时间' })
  delivery_at: number;

  @Column({ comment: '物料编号', nullable: true })
  material_no: string;

  @Column({ comment: '材料类型' })
  raw_type: string;

  @Column('int')
  nums: number;

  @Column({ comment: '所需模具' })
  requireMold: string;

  @Column({ type: 'int', comment: '优先级', nullable: true })
  priority: number;
  /**
   * 状态可选值： ['wait', 'process', 'finish']
   */
  @Column('varchar', { length: 20, default: 'wait', comment: '状态' })
  status: string;

  @Column('int', { default: 0, comment: '是否删除 0 否 1 是', nullable: true })
  is_deleted?: number;
}
