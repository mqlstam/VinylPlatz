import { ApiListResponse, ApiSingleResponse } from '@vinylplatz/shared/api';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<ApiListResponse<unknown> | ApiSingleResponse<unknown>> {
        return next.handle().pipe(
            map((data) => {
                if (data instanceof Array) {
                    return {
                        results: data,
                        info: {
                            version: '1.0',
                            type: 'list',
                            count: data.length,
                        },
                    } as ApiListResponse<unknown>;
                } else {
                    return {
                        result: data,
                        info: {
                            version: '1.0',
                            type: 'object',
                            count: data ? 1 : 0,
                        },
                    } as ApiSingleResponse<unknown>;
                }
            })
        );
    }
}
