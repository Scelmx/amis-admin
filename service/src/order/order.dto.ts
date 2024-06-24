export class CreateOrderDto {
  readonly createdAt: number;
  readonly deliveryAt: number;
  readonly materialId: string;
  readonly rawType: string;
  readonly nums: number;
  isDeleted?: number;
}

export class UpdateOrderDto {
  readonly id: string;
  readonly createdAt: number;
  readonly deliveryAt: number;
  readonly materialId: string;
  readonly rawType: string;
  readonly nums?: number;
  isDeleted?: number;
}
