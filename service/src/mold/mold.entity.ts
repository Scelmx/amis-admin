import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mold {
  /**
   * 模具ID
   */
  @PrimaryGeneratedColumn({ comment: '模具ID' })
  id: number;

  /**
   * 产品名称
   */
  @Column({ comment: '产品名称' })
  produce_name: string;

  /**
   * 模具编号
   */
  @Column({ comment: '模具编号' })
  template_no: string;

  /**
   * 模具型号
   */
  @Column({ comment: '模具型号' })
  template_model: string;

  /**
   * 模具大小
   */
  @Column({ comment: '模具大小' })
  template_size: string;

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
  @Column({ type: 'int', comment: '班产数量' })
  half_day_nums: number;

  /**
   * 模具区域
   */
  @Column({ type: 'varchar', comment: '班产数量' })
  region: string;

  @Column('int', { comment: '是否删除 0 否 1 是', nullable: true, default: 0 })
  is_deleted: number;
}
