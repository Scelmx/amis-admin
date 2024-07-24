import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '订单号', nullable: true })
  order_no: string;

  @Column({ comment: '客户' })
  customer_id: number;

  @Column({ comment: '商品名称' })
  goods_name: string;

  @Column({ comment: '商品型号' })
  goods_model: string;

  @Column({ comment: '创建时间' })
  created_at: number;

  @Column({ comment: '交付时间' })
  delivery_at: number;

  @Column()
  material_id: string;

  @Column({ comment: '物料编号', nullable: true })
  material_no: string;

  @Column({ comment: '材料类型' })
  raw_type: string;

  @Column('int')
  nums: number;

  /**
   * 状态可选值： ['wait', 'process', 'finish']
   */
  @Column('varchar', { length: 20 })
  status: string;

  @Column('int', { default: 0, comment: '是否删除 0 否 1 是', nullable: true })
  is_deleted?: number;
}
