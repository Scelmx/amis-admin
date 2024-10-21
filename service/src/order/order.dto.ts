import { ListDto } from "../common/common.dto";

export class FindAllDto extends ListDto {
  status: string;
  customerId: number;
}