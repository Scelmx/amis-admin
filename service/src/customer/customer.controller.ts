import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { addCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { returnData } from '../utils';

@Controller('/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/list')
  async getCustomerList(@Query() query) {
    const res = await this.customerService.getCustomerList(query);
    return returnData(
      query.isList
        ? res
        : res?.map((item: Customer) => {
            return {
              label: item.ctName,
              value: item.id,
            };
          }),
    );
  }

  @Post('/add')
  async addCustomer(@Body() body: addCustomerDto) {
    const res = await this.customerService.addCustomer(body);
    return returnData(res);
  }

  @Post('/update')
  async updateCustomer(@Body() body: addCustomerDto & { id: number }) {
    const res = await this.customerService.updateCustomer({
      id: body.id,
      ctName: body.customerName,
      isDeleted: body.isDeleted ? 1 : 0,
    });
    return returnData(res);
  }

  @Get('/del')
  async removeCustomer(@Query() query) {
    const res = await this.customerService.removeCustomer(query.id);
    return returnData(res);
  }
}
