import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}

    /** 获取全部客户列表 */
    getCustomerList(where): Promise<Customer[]> {
        const { page, pageSize, ctName } = where; 
        const skip = page > 0 ? (page - 1) * pageSize : 0;
        const options: FindManyOptions<Customer> = {
            where: { ct_name: ctName ? Like(`%${ctName}%`) : undefined, ct_is_delete: 0 },
            order: { id: 'DESC' },
            skip,
            take: pageSize
        };
        return this.customerRepository.find(options);
    }

    /** 通过Id查找客户 */
    getCustomerById(id: number): Promise<Customer> {
        return this.customerRepository.findOneBy({ id });
    }

    /** 标记删除客户 */
    async removeCustomer(id: number) {
        return this.customerRepository.update({ id }, { ct_is_delete: 1 })
    }
    

    /** 更新产品 */
    async updateCustomer(customer: Customer) {
        return this.customerRepository.update({ id: customer.id }, customer);
    }

    /** 添加客户 */
    addCustomer(customer: Customer): Promise<Customer> {
        try {
            return this.customerRepository.save(customer);
        } catch (err) {
            console.log(err, '????');
        }
    }
}
