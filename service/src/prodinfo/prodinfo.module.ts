import { Module } from '@nestjs/common';
import { ProdInfoController } from './prodinfo.controller';
import { ProdInfoService } from './prodinfo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdInfo } from './prodinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdInfo])],
  controllers: [ProdInfoController],
  providers: [ProdInfoService],
  exports: [ProdInfoService], 
})
export class ProdInfoModule {}
