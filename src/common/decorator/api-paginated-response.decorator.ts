import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description: string = '페이지네이션 결과'
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponse, model),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  totalItems: { type: 'number' },
                  totalPages: { type: 'number' },
                  currentPage: { type: 'number' },
                  take: { type: 'number' }
                }
              }
            },
          },
        ],
      },
    }),
  );
};