import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    getCustomerList(where: any): Promise<Customer[]>;
    getCustomerById(id: number): Promise<Customer>;
    removeCustomer(id: number): Promise<import("typeorm").UpdateResult>;
    updateCustomer(customer: Customer): Promise<import("typeorm").UpdateResult>;
    addCustomer(customer: Customer): Promise<Customer>;
}
