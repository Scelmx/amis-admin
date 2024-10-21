import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { addCustomerDto } from './customer.dto';
import { genWhereObj } from '../utils';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /** 获取全部客户列表 */
  async getCustomerList(params): Promise<Customer[]> {
    const { ctName, ...otherParams } = params;
    const where: FindManyOptions<Customer> = genWhereObj(otherParams, { ctName: ctName ? Like(`%${ctName}%`) : undefined })
    return await this.customerRepository.find(where);
  }

  /** 通过Id查找客户 */
  async getCustomerById(id: number): Promise<Customer> {
    return await this.customerRepository.findOneBy({ id });
  }

  /** 标记删除客户 */
  async removeCustomer(id: number) {
    return await this.customerRepository.update({ id }, { isDeleted: 1 });
  }

  /** 更新产品 */
  async updateCustomer(customer: Customer) {
    return await this.customerRepository.update({ id: customer.id }, customer);
  }

  /** 添加客户 */
  async addCustomer(customer: addCustomerDto): Promise<Customer> {
    return await this.customerRepository.save({
      ctName: customer.customerName,
      isDeleted: customer.isDeleted ? 1 : 0,
    });
  }
}
