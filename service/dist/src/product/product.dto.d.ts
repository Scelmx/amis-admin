export declare class ProductDto {
    id?: number;
    orderNo?: string;
    ptype: string;
    size: string;
    productImage: string;
    material: string;
    color: string;
    productNo: string;
    customerId: number;
    materialHardness: string;
    tensileStrength: string;
    stretchElongationRate: string;
    tearStrength?: string;
    testStrength: string;
    testHardness: string;
    testElongationRate: string;
    testTear?: string;
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
export declare class getProductListDto {
    customerId?: number;
    page: number;
    pageSize: number;
}
export declare class downloadProductDocxDto {
    id: number;
}
