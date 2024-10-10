import { ListDto } from '../common/common.dto';

export interface SortInfoDto {
  id?: number;
  machineId?: number;
  orderId?: number;
}

export interface FindSortInfoAllDto {
  machineId?: number;
  orderId?: number;
}
