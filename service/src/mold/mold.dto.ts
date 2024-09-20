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
  /** 模具号 */
  readonly templateNo: string;
  readonly templateModel: string;
  readonly templateSize: string;
  readonly hole: number;
  readonly mode: number;
  readonly halfDayNums: number;
  readonly region: string;
  readonly isDeleted?: number;
}

export class CreateWordDto {
  /**
   * 模具号
   */
  templateNo: string;

  /**
   * 原料名称
   */
  feedstockId: string;

  /**
   * 班次 0: 白班 1: 夜班
   */
  sailings: string;

  /**
   * 生成日期
   */
  createDate: string | number;

  /**
   * 硫化工
   */
  sulfurChemist: string
}
