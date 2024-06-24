export class ProductDto {
  id?: number;
  orderNo?: string
  ptype: string; // 名称
  size: string;
  productImage: string;
  material: string; // 材料
  color: string; // 颜色
  productNo: string; // 编码
  customerId: number;
  materialHardness: string; // 硬度
  tensileStrength: string; // 拉伸强度
  stretchElongationRate: string; // 拉伸率 
  tearStrength?: string; // 撕裂强度
  testStrength: string; // 检测强度
  testHardness: string; // 检测硬度
  testElongationRate: string // 检测延长率
  testTear?: string; // 检测撕裂
  size1: string;
  size1Top: string;
  realSize1Top: string;
  size1Down?: string;
  realSize1Down: string;
  size2: string;
  size2Top: string;
  realSize2Top: string;
  size2Down?: string;
  realSize2Down: string;
  size3?: string;
  size3Top?: string;
  realSize3Top: string;
  size3Down?: string;
  realSize3Down: string;
}

export class getProductListDto {
  customerId?: number; // 客户名称
  page: number;
  pageSize: number;
}

export class downloadProductDocxDto {
  id: number;
}