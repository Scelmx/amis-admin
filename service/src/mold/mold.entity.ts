import { Common } from '../common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mold extends Common {
  /**
   * 产品名称
   */
  @Column({ name: 'produce_name', comment: '产品名称' })
  produceName: string;

  /**
   * 模具编号
   */
  @Column({ name: 'template_no', comment: '模具编号' })
  templateNo: string;

  /**
   * 模具型号
   */
  @Column({ name: 'template_model', comment: '模具型号' })
  templateModel: string;

  /**
   * 模具大小
   */
  @Column({ name: 'template_size', comment: '模具大小' })
  templateSize: string;

  /**
   * 孔数
   */
  @Column({ type: 'int', comment: '孔数' })
  hole: number;

  /**
   * 班产额定模数
   */
  @Column({ type: 'int', comment: '班产额额定模数' })
  mode: number;

  /**
   * 班产数
   */
  @Column({ name: 'half_day_nums', type: 'int', comment: '班产数量' })
  halfDayNums: number;

  /**
   * 模具区域
   */
  @Column({ type: 'varchar', comment: '班产数量' })
  region: string;
}
