import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.url?.includes('/download')) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        // 这里可以根据需要修改响应数据的结构
        if (!!data?.data) {
          return {
            ...data,
            status: 0,
            msg: 'success',
          };
        }
        return {
          status: 1,
          msg: data.msg || '操作失败',
          data: '失败',
        };
      }),
    );
  }
}
