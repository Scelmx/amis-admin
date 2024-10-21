export class CreateMachinesDto {
  readonly name: string;
  // 可生产的产品类型
  readonly type: string;
  // 模具信息
  readonly mold: string;
  // 订单数量
  readonly orders: string;
  // 是否删除
  isDeleted?: number;
}

export class UpdateMachinesDto {
  id: number;
  readonly name: string;
  // 可生产的产品类型
  readonly type: string;
  // 模具信息
  readonly mold: string;
  // 订单数量
  readonly orders: string;
  // 是否删除
  isDeleted?: number;
}
