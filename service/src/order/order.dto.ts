export class CreateOrderDto {
  readonly createdAt: number;
  readonly deliveryAt: number;
  readonly materialId: string;
  readonly rawType: string;
  readonly nums: number;
  status: string;
  isDeleted?: number;
}

export class UpdateOrderDto {
  readonly id: number;
  readonly createdAt: number;
  readonly deliveryAt: number;
  readonly materialId: string;
  readonly rawType: string;
  readonly nums?: number;
  status: string;
  isDeleted?: number;
}
