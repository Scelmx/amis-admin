export class CreateMoldDto {
  readonly produceName: string;
  readonly templateNo: string;
  readonly templateModel: string;
  readonly templateSize: string;
  readonly hole: number;
  readonly mode: number;
  readonly halfDayNums: number;
  readonly region: number;
  readonly isDeleted?: number;
}

export class UpdateMoldDto {
  readonly id: number;
  readonly produceName: string;
  readonly templateNo: string;
  readonly templateModel: string;
  readonly templateSize: string;
  readonly hole: number;
  readonly mode: number;
  readonly halfDayNums: number;
  readonly region: string;
  readonly isDeleted?: number;
}

export class ListDto {
  page: number;
  pageSize: number;
}