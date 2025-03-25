export interface SortInfoDto {
  id?: number;
  machineId?: number;
  orderId?: number;
}

export interface FindSortInfoAllDto {
  machineId?: number;
  orderId?: number;
}

export interface UpdateSortInfoDto {
  id?: number;
  machineId?: number;
  orderId: number;
  position?: number;
  durationTime: number;
  latestStartTime: number;
  startTime: number;
  endTime: number;
  status?: string;
  isBlack?: number;
}
