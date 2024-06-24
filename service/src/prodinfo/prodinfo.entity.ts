import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProdInfo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  ptype: string;

  @Column()
  image_left: string; // 'l': 左侧图片, 'r': 右侧图片

  @Column()
  image_right: string;

  @Column()
  center_x1: string; // 圆心x

  @Column({ nullable: true })
  center_x2?: string; 

  @Column()
  center_y1: string; // 

  @Column({ nullable: true })
  center_y2?: string; // 圆心Y2

  @Column()
  real_center1: string; // 真圆心

  @Column({ nullable: true })
  real_center2?: string; // 真圆心

  @Column({ default: 0, comment: '是否删除 0 否 1 是' })
  is_deleted: number;
}