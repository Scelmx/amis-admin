export class ProdInfoDto {
    id?: number;
    ptype: string; // 产品类型
    imageLeft: string; // 左图片
    imageRight: string; // 右图片
    centerX1: string; // 圆心x
    centerX2: string; // 
    centerY1: string; // 
    centerY2: string; // 圆心Y2
    realCenter1: string; // 真圆心
    realCenter2: string; // 真圆心
    isDeleted?: number;
}

export class ListDto {
    page: number;
    pageSize: number;
}