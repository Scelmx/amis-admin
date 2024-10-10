import { Injectable, Response } from '@nestjs/common';
import { Product } from './product.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { downloadProductDocxDto, getProductListDto } from './product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    /** 获取产品列表 */
    async getProductList(query: Pick<getProductListDto, 'customerId'>): Promise<{ count, data: Product[] }> {
        const { customerId } = query;
        const options: FindManyOptions<Product> = {
            where: { customer_id: customerId, is_deleted: 0 },
            order: { id: 'DESC' }
        };
        const count = await this.productRepository.count(options);
        const data = await this.productRepository.find(options);
        return { count, data }
    }

    async getProductById(query: downloadProductDocxDto): Promise<Product> {
        return await this.productRepository.findOneBy(query)
    }

    /** 添加产品 */
    async addProduct(product: Product): Promise<Product> {
        return await this.productRepository.save(product)
    }

    /** 标记删除客户 */
    async removeProduct(id: number) {
        return await this.productRepository.update({ id }, { is_deleted: 1 })
    }

    /** 更新产品 */
    async updateProduct(product: Product) {
        return await this.productRepository.update({ id: product.id }, product);
    }
}
