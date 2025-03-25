import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Common {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    name: 'created_at',
    type: 'bigint',
    comment: '创建时间',
    nullable: true,
  })
  createdAt?: number;

  @Column({
    name: 'created_by',
    comment: '创建人',
    nullable: true,
  })
  createdBy?: string;

  @Column({
    name: 'is_deleted',
    comment: '是否删除',
    default: 0,
  })
  isDeleted: number;
}
