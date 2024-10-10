import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProdInfo extends Common {
  @Column()
  ptype: string;

  @Column({ name: 'image_left' })
  imageLeft: string; // 'l': 左侧图片, 'r': 右侧图片

  @Column({ name: 'image_right' })
  imageRight: string;

  @Column({ name: 'center_x1' })
  centerX1: string; // 圆心x

  @Column({ name: 'center_x2', nullable: true })
  centerX2?: string; 

  @Column({ name: 'center_y1' })
  centerY1: string; // 

  @Column({ name: 'center_y2',nullable: true })
  centerY2?: string; // 圆心Y2

  @Column({ name: 'real_center1' })
  realCenter1: string; // 真圆心

  @Column({ name: 'real_center2', nullable: true })
  realCenter2?: string; // 真圆心
}