import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoldService } from './mold.service';
import { MoldController } from './mold.controller';
import { Mold } from './mold.entity';
import { FeedStocksModule } from '../feedstock/feedstock.module';

@Module({
  imports: [
    FeedStocksModule,
    TypeOrmModule.forFeature([Mold])
  ],
  controllers: [MoldController],
  providers: [MoldService],
  exports: [MoldService]
})
export class MoldModule {}
