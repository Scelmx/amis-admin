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

  @Column({ type: 'varchar', length: 20, enum: ['wait', 'process', 'finish']})
  status: string;

  @Column({ default: 0, comment: '是否删除' })
  is_deleted?: number;
}
