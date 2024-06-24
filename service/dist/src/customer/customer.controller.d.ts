import { CustomerService } from './customer.service';
import { addCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getCustomerList(query: any): Promise<Customer[] | {
        label: string;
        value: number;
    }[]>;
    addCustomer(body: addCustomerDto): Promise<Customer>;
    updateCustomer(body: addCustomerDto & {
        id: number;
    }): Promise<import("typeorm").UpdateResult>;
    removeCustomer(query: any): Promise<import("typeorm").UpdateResult>;
}
