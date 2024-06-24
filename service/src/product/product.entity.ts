import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  customer_id: number;

  @Column()
  product_image: string;

  @Column()
  product_no: string;

  @Column()
  order_no?: string;

  @Column()
  ptype: string; // 产品类型

  @Column()
  material: string; // 材料

  @Column({ comment: '规格型号' })
  size: string;

  @Column()
  color: string; // 颜色

  @Column()
  material_hardness: string;

  @Column()
  tensile_strength: string; // 拉伸强度

  @Column()
  stretch_elongation_rate: string; // 拉伸率

  @Column()
  test_strength: string; // 检测强度

  @Column()
  test_hardness: string; // 检测硬度

  @Column()
  test_elongation_rate: string // 检测延长率

  @Column({ nullable: true, comment: '撕裂强度' })
  tear_strength: string

  @Column({ nullable: true, comment: '检测拉断' })
  test_tear: string; // 检测拉断

  @Column()
  size1: string; // 关键尺寸1

  @Column()
  size1_top: string

  @Column({ nullable: true })
  size1_down?: string

  @Column()
  size2: string; // 关键尺寸2

  @Column()
  size2_top: string

  @Column({ nullable: true })
  size2_down?: string 

  @Column({ nullable: true })
  size3?: string; // 关键尺寸1

  @Column({ nullable: true })
  size3_top?: string

  @Column({ nullable: true })
  size3_down?: string 

  @Column({ nullable: true })
  real_size1_top?: string

  @Column({ nullable: true })
  real_size1_down?: string 

  @Column({ nullable: true })
  real_size2_top?: string

  @Column({ nullable: true })
  real_size2_down?: string 

  @Column({ nullable: true })
  real_size3_top?: string

  @Column({ nullable: true })
  real_size3_down?: string 


  @Column({ default: 0, comment: '是否删除 0 否 1 是' })
  is_deleted?: number
}