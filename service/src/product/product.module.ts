import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProdInfoModule } from '../prodinfo/prodinfo.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    ProdInfoModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
