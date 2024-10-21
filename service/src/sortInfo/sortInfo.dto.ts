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
  status?: string;
  isBlack?: number;
}
