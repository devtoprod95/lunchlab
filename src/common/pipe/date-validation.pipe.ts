import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!datePattern.test(value)) {
      throw new BadRequestException('날짜 형식은 YYYY-MM-DD이어야 합니다');
    }
    
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜입니다');
    }
    
    return value;
  }
}