import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mold {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  produce_name: string;

  @Column()
  template_no: string;

  @Column()
  template_model: string;

  @Column()
  template_size: string;

  @Column('int')
  hole: number;

  @Column('int')
  mode: number;

  @Column('int')
  half_day_nums: number;
}
