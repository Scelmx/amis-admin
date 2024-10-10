export class CreateFeedStockDto {
  name: string;
  formationTime: string;
  formationPressure: string;
  upperMoldTemperature: string;
  lowerMoldTemperature: string;
  isDeleted?: number;
}

export class UpdateFeedStockDto {
  id: number;
  name: string;
  formationTime: string;
  formationPressure: string;
  upperMoldTemperature: string;
  lowerMoldTemperature: string;
  isDeleted?: number;
}