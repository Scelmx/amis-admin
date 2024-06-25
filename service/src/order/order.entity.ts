import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  created_at: number;

  @Column()
  delivery_at: number;

  @Column()
  material_id: string;

  @Column({ comment: '材料类型' })
  raw_type: string;

  @Column('int')
  nums: number;

  @Column({ type: 'varchar', length: 20, enum: ['wait', 'process', 'finish']})
  status: string;

  @Column({ default: 0, comment: '是否删除' })
  is_deleted?: number;
}
