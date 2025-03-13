import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 카멜케이스를 스네이크케이스로 변환하는 함수
function camelToSnake(obj: any): any {
  // null이거나 primitive 타입이면 그대로 반환
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Date 객체는 변환하지 않고 그대로 반환
  if (obj instanceof Date) {
    return obj;
  }
  
  // 배열이면 각 요소에 대해 재귀적으로 처리
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }
  
  // 일반 객체인 경우 키만 변환하고 값은 재귀적으로 처리
  return Object.keys(obj).reduce((result, key) => {
    // 키를 스네이크케이스로 변환
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = camelToSnake(obj[key]);
    return result;
  }, {});
}

@Injectable()
export class CamelToSnakeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => camelToSnake(data))
      );
  }
}