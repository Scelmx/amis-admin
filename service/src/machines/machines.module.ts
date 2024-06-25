import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesService } from './machines.service';
import { MachineController } from './machines.controller';
import { Machines } from './machines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machines])],
  controllers: [MachineController],
  providers: [MachinesService],
})
export class MachinesModule {}
