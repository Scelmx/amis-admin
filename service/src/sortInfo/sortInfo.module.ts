import { Module } from '@nestjs/common';
import { SortInfoService } from './sortInfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortInfo } from './sortInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SortInfo]),
  ],
  controllers: [],
  providers: [SortInfoService],
  exports: [SortInfoService],
})
export class SortInfoModule {}
