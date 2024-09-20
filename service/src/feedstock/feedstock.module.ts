import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedStockService } from './feedstock.service';
import { FeedStockController } from './feedstock.controller';
import { FeedStock } from './feedstock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedStock])],
  controllers: [FeedStockController],
  providers: [FeedStockService],
  exports: [FeedStockService],
})
export class FeedStocksModule {}
