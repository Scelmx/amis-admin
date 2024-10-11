import { Common } from '../common/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class FeedStock extends Common {
  /**
   * 原料名称
   */
  @Column('varchar', { comment: '原料名称' })
  name: string;

  /**
   * 成型时间
   */
  @Column('varchar', { name: 'formation_time', comment: '成型时间' })
  formationTime: string;

  /**
   * 成型压力
   */
  @Column('varchar', { name: 'formation_pressure', comment: '成型压力' })
  formationPressure: string;

  /**
   * 上模温度
   */
  @Column('varchar', { name: 'upper_mold_temperature', comment: '上模温度' })
  upperMoldTemperature: string;

  /**
   * 下模温度
   */
  @Column('varchar', { name: 'lower_mold_temperature', comment: '下模温度' })
  lowerMoldTemperature: string;
}
