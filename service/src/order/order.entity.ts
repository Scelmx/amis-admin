import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order extends Common {
  @Column({ name: 'order_no', comment: '订单号', nullable: true })
  orderNo: string;

  @Column({ name: 'customer_id', comment: '客户' })
  customerId: number;

  @Column({ name: 'product_type', comment: '产品类型' })
  productType: string;

  @Column({ name: 'goods_name', comment: '商品名称', nullable: true })
  goodsName: string;

  @Column({ name: 'goods_model', comment: '商品型号', nullable: true })
  goodsModel: string;

  @Column({ name: 'delivery_at', type: 'bigint', comment: '交付时间' })
  deliveryAt: number;

  @Column({ name: 'material_no', comment: '物料编号', nullable: true })
  materialNo: string;

  @Column({ name: 'raw_type', comment: '材料类型' })
  rawType: string;

  @Column('int')
  nums: number;

  @Column({ name: 'require_mold', comment: '所需模具' })
  requireMold: string;

  @Column({ type: 'int', comment: '优先级', nullable: true })
  priority: number;
  /**
   * 状态可选值： ['wait', 'process', 'finish']
   */
  @Column('varchar', { length: 20, default: 'wait', comment: '状态' })
  status: string;
}
