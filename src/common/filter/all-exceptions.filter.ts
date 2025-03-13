import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    // message: string;
    data?: T;
    error?: string | string[];
    timestamp: string;
    path: string;
  }
  
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();
    
    const status = exception.getStatus();

    const exceptionResponse = exception instanceof HttpException 
    ? exception.getResponse() 
    : null;

    let message: string;
    if (exceptionResponse && typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        // message가 배열이면 첫 번째 항목을, 문자열이면 그대로 사용
        message = Array.isArray(exceptionResponse['message']) 
            ? exceptionResponse['message'][0] 
            : exceptionResponse['message'];
    } else if (exception instanceof Error) {
        message = exception.message;
    } else {
        message = '서버 내부 오류가 발생했습니다';
    }

    const errorResponse: ApiResponse<null> = {
      success: false,
      statusCode: status,
    //   error: exception instanceof Error ? exception.message : String(exception),
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}