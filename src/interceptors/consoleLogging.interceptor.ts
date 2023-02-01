import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCustom } from '../utils/definitions';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('----> Before request Interceptor...');

    // do something with request
    const request: RequestCustom = context.switchToHttp().getRequest();
    console.log(request.user);
    
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`----> After request Interceptor... ${Date.now() - now}ms`)),
      );
  }
}