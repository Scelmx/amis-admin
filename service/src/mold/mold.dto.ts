export class CreateMoldDto {
    readonly produce_name: string;
    readonly template_no: string;
    readonly template_model: string;
    readonly template_size: string;
    readonly hole: number;
    readonly mode: number;
    readonly half_day_nums: number;
  }
  
  export class UpdateMoldDto {
    readonly id: number;
    readonly produce_name?: string;
    readonly template_no?: string;
    readonly template_model?: string;
    readonly template_size?: string;
    readonly hole?: number;
    readonly mode?: number;
    readonly half_day_nums?: number;
  }
  