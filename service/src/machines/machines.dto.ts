export class CreateMachinesDto {
  readonly hole: number;
  readonly mode: number;
  readonly type: string;
  readonly orders: string;
  isDeleted?: number;
}

export class UpdateMachinesDto {
  id: string;
  readonly hole: number;
  readonly mode: number;
  readonly type: string;
  readonly orders: string;
  isDeleted?: number;
}
