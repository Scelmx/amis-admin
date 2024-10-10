import { Injectable, Response } from '@nestjs/common';
import { Product } from './product.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { downloadProductDocxDto, getProductListDto } from './product.dto';
import { genWhereObj } from 'src/utils';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    /** 获取产品列表 */
    async getProductList(query: getProductListDto): Promise<{ count, data: Product[] }> {
        const { customerId, ...otherParams } = query;
        const where = genWhereObj(otherParams, { customerId })
        const count = await this.productRepository.count(where);
        const data = await this.productRepository.find(where);
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
        return await this.productRepository.update({ id }, { isDeleted: 1 })
    }

    /** 更新产品 */
    async updateProduct(product: Product) {
        return await this.productRepository.update({ id: product.id }, product);
    }
}
