import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends Common {
  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'product_image' })
  productImage: string;

  @Column({ name: 'product_no' })
  productNo: string;

  @Column({ name: 'order_no' })
  orderNo?: string;

  @Column()
  ptype: string; // 产品类型

  @Column()
  material: string; // 材料

  @Column({ comment: '规格型号' })
  size: string;

  @Column()
  color: string; // 颜色

  @Column({ name: 'material_hardness' })
  materialHardness: string;

  @Column({ name: 'tensile_strength' })
  tensileStrength: string; // 拉伸强度

  @Column({ name: 'stretch_elongation_rate' })
  stretchElongationRate: string; // 拉伸率

  @Column({ name: 'test_strength' })
  testStrength: string; // 检测强度

  @Column({ name: 'test_hardness', comment: '检测强度' })
  testHardness: string; // 检测硬度

  @Column({ name: 'test_elongation_rate', comment: '检测延长率' })
  testElongationRate: string; // 检测延长率

  @Column({ name: 'tear_strength', nullable: true, comment: '撕裂强度' })
  tearStrength: string;

  @Column({ name: 'test_tear', nullable: true, comment: '检测拉断' })
  testTear: string; // 检测拉断

  @Column()
  size1: string; // 关键尺寸1

  @Column({ name: 'size1_top' })
  size1Top: string;

  @Column({ name: 'size1_down', nullable: true })
  size1Down?: string;

  @Column()
  size2: string; // 关键尺寸2

  @Column({ name: 'size2_top' })
  size2Top: string;

  @Column({ name: 'size2_down', nullable: true })
  size2Down?: string;

  @Column({ nullable: true })
  size3?: string; // 关键尺寸1

  @Column({ name: 'size3_top', nullable: true })
  size3Top?: string;

  @Column({ name: 'size3_down', nullable: true })
  size3Down?: string;

  @Column({ name: 'real_size1_top', nullable: true })
  realSize1Top?: string;

  @Column({ name: 'real_size1_down', nullable: true })
  realSize1Down?: string;

  @Column({ name: 'real_size2_top', nullable: true })
  realSize2Top?: string;

  @Column({ name: 'real_size2_down', nullable: true })
  realSize2Down?: string;

  @Column({ name: 'real_size3_top', nullable: true })
  realSize3Top?: string;

  @Column({ name:'real_size3_down',nullable: true })
  realSize3Down?: string;
}
