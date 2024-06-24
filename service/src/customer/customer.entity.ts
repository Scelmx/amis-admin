import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  ct_name: string;

  @Column({ comment: '是否删除 0 否 1 是' })
  ct_is_delete: number;
}