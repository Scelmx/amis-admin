import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FeedStock {
  @PrimaryGeneratedColumn()
  id: string;

  /** 
   * 原料名称
   */
  @Column('varchar', { comment: '原料名称' })
  name: string;

  /** 
   * 成型时间
   */
  @Column('varchar', { comment: '成型时间' })
  formation_time: string;

  /**
   * 成型压力
   */
  @Column('varchar', { comment: '成型压力' })
  formation_pressure: string;

  /**
   * 上模温度
   */
  @Column('varchar', { comment: '上模温度' })
  upper_mold_temperature: string;

  /**
   * 下模温度
   */
  @Column('varchar', { comment: '下模温度' })
  lower_mold_temperature: string;

  @Column('int', { comment: '是否删除', default: 0, nullable: true })
  is_deleted: number;
}