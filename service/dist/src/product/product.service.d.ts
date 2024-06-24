import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { downloadProductDocxDto, getProductListDto } from './product.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getProductList(query: Pick<getProductListDto, 'customerId'>): Promise<{
        count: any;
        data: Product[];
    }>;
    getProductById(query: downloadProductDocxDto): Promise<Product>;
    addProduct(product: Product): Promise<Product>;
    removeProduct(id: number): Promise<import("typeorm").UpdateResult>;
    updateProduct(product: Product): Promise<import("typeorm").UpdateResult>;
}
