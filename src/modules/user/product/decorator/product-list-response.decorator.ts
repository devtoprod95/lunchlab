import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ProductListResponseSchema = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: '상품 목록 및 가격 조회 성공',
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            description: '페이지네이션된 상품 목록',
            items: {
              type: 'object',
              properties: {
                product_id: { 
                  type: 'number', 
                  example: 1,
                  description: '상품ID' 
                },
                name: { 
                  type: 'string', 
                  example: '가정식 도시락',
                  description: '상품명' 
                },
                price: { 
                  type: 'number', 
                  example: 9000,
                  description: '상품 기본 가격' 
                },
                user_products: {
                  type: 'array',
                  description: '회원 별 가격 정보 목록',
                  items: {
                    type: 'object',
                    properties: {
                      id: { 
                        type: 'number', 
                        example: 2,
                        description: '회원 설정ID' 
                      },
                      user_id: { 
                        type: 'number', 
                        example: 1,
                        description: '회원ID' 
                      },
                      price: { 
                        type: 'number', 
                        example: 100,
                        description: '회원별 가격' 
                      }
                    }
                  }
                }
              }
            }
          },
          meta: {
            type: 'object',
            description: '페이지네이션 메타 정보',
            properties: {
              total_items: { 
                type: 'number', 
                example: 4,
                description: '전체 수' 
              },
              total_pages: { 
                type: 'number', 
                example: 1,
                description: '전체 페이지 수' 
              },
              current_page: { 
                type: 'number', 
                example: 1,
                description: '현재 페이지 번호' 
              },
              take: { 
                type: 'number', 
                example: 10,
                description: '페이지당 항목 수' 
              }
            }
          }
        }
      }
    })
  );
};