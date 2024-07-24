import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module'
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './injectable/response';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from './injectable/upload';
import { ProdInfoModule } from './prodinfo/prodinfo.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import { MachinesModule } from './machines/machines.module';
import { MoldModule } from './mold/mold.module';
import { FeedStocksModule } from './feedstock/feedstock.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'), // 'public' 是存放静态资源的目录
      serveRoot: '/uploads', // 静态资源的 URL 前缀
    }),
    MulterModule.register(getMulterConfig()),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'autodocx',
      autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
      synchronize: true,
    }),
    CustomerModule,
    ProductModule,
    ProdInfoModule,
    OrderModule,
    MachinesModule,
    MoldModule,
    FeedStocksModule
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  }]
})
export class AppModule {}
