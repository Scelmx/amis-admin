import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { snakeToCamelCase } from '../utils';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // 这里可以根据需要修改响应数据的结构
        if (!!data?.data) {
          return {
            ...data,
            status: 0,
            msg: 'success',
            data: Array.isArray(data?.data) ? [...data?.data.map((item) => snakeToCamelCase(item))] : { ...snakeToCamelCase(data.data) }
          }
        }
        return {
          status: 1,
          msg: data.msg || '操作失败',
          data: '失败'
        }
      })
    );
  }
}