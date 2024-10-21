import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer extends Common {
  @Column({ name: 'ct_name' })
  ctName: string;
}