export class CreateMachinesDto {
  readonly name: string;
  /** 孔数 */
  readonly hole: number;
  /** 额定模数 */
  readonly mode: number;
  // 可生产的产品类型
  readonly type: string;
  // 班产
  readonly dayNums: number;
  // 模具信息
  readonly mold: string;
  // 订单数量
  readonly orders: string;
  // 是否删除
  isDeleted?: number;
}

export class UpdateMachinesDto {
  id: string;
  readonly name: string;
  /** 孔数 */
  readonly hole: number;
  /** 额定模数 */
  readonly mode: number;
  // 可生产的产品类型
  readonly type: string;
  // 班产
  readonly dayNums: number;
  // 模具信息
  readonly mold: string;
  // 订单数量
  readonly orders: string;
  // 是否删除
  isDeleted?: number;
}
