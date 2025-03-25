import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { MachinesModule } from '../machines/machines.module';
import { MoldModule } from '../mold/mold.module';
import { SortInfoModule } from '../sortInfo/sortInfo.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MachinesModule, MoldModule, SortInfoModule, CustomerModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
