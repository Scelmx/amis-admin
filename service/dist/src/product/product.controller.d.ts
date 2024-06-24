import { ProductDto, downloadProductDocxDto, getProductListDto } from './product.dto';
import { ProductService } from './product.service';
import { ProdInfoService } from '../prodinfo/prodinfo.service';
import { Response } from 'express';
import { Pd, ProductName } from './const';
import { Product } from './product.entity';
import { CustomerService } from '../customer/customer.service';
export declare class ProductController {
    private prodInfoService;
    private productService;
    private customerService;
    constructor(prodInfoService: ProdInfoService, productService: ProductService, customerService: CustomerService);
    getProducts(query: getProductListDto): Promise<{
        count: any;
        data: Product[];
    }>;
    getProductTypeList(): {
        label: ProductName;
        value: Pd;
    }[];
    delProduct(query: {
        id: number;
    }): Promise<import("typeorm").UpdateResult>;
    download(query: downloadProductDocxDto, response: Response): Promise<false | "">;
    addProduct(body: ProductDto): Promise<Product>;
    updateProduct(body: Partial<ProductDto> & {
        id: number;
    }): Promise<import("typeorm").UpdateResult>;
}
