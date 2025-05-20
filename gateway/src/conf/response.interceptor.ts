// src/common/interceptors/response.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe(
            map((data) => ({
                success: true,
                statusCode: response.statusCode,
                message: '요청이 성공적으로 처리되었습니다.',
                data: data ?? null, // null → {}로 변경 가능
                timestamp: new Date().toISOString(),
            })),
        );
    }
}
