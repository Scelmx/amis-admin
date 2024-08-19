import { CommonDto, ListDto } from "../common/common.dto";

export class CreateOrderDto extends CommonDto {
  // 订单编号
  readonly orderNo: number;
  // 客户ID
  readonly customerId: number;
  // 创建时间
  readonly createdAt: number;
  // 商品名称
  readonly goodsName: string;
  // 商品型号
  readonly goodsModel: string;
  // 交付时间
  readonly deliveryAt: number;
  // 机器编号
  readonly materialId: string;
  // 物料编号
  readonly rawType: string;
  // 生产数量
  readonly nums: number;
  // 订单状态
  status: string;
  // 是否删除
  isDeleted?: number;
}

export class UpdateOrderDto extends CommonDto {
  readonly id: number;
  readonly orderNo: number;
  // 客户ID
  readonly customerId: number;
  // 创建时间
  readonly createdAt: number;
  // 商品名称
  readonly goodsName: string;
  // 商品型号
  readonly goodsModel: string;
  // 交付时间
  readonly deliveryAt: number;
  // 机器编号
  readonly materialId: string;
  // 物料编号
  readonly rawType: string;
  // 生产数量
  readonly nums: number;
  // 订单状态
  status: string;
  // 是否删除
  isDeleted?: number;
}

export class FindAllDto extends ListDto {
  status: string;
  customerId: number;
}