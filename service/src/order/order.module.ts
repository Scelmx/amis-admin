import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { MachinesModule } from '../machines/machines.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MachinesModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
