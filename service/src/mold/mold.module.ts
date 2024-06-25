import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoldService } from './mold.service';
import { MoldController } from './mold.controller';
import { Mold } from './mold.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mold])],
  controllers: [MoldController],
  providers: [MoldService],
})
export class MoldModule {}
