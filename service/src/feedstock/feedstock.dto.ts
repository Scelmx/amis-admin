export class CreateFeedStockDto {
  name: string;
  formationTime: string;
  formationPressure: string;
  upperMoldTemperature: string;
  lowerMoldTemperature: string;
  isDeleted?: number;
}

export class UpdateFeedStockDto {
  id: string;
  name: string;
  formationTime: string;
  formationPressure: string;
  upperMoldTemperature: string;
  lowerMoldTemperature: string;
  isDeleted?: number;
}