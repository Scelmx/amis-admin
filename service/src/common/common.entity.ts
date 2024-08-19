import { Column, Entity } from 'typeorm';

@Entity()
export class Common {
  @Column({
    type: 'bigint',
    comment: '创建时间',
    nullable: true,
  })
  created_at: number;

  @Column({ comment: '创建人', nullable: true })
  created_by: string;
}
