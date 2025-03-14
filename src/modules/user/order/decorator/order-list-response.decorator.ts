import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const OrderListResponseSchema = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: '주문 목록 조회 성공',
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            description: '페이지네이션된 주문 목록',
            items: {
              type: 'object',
              properties: {
                id: { 
                  type: 'number', 
                  example: 20,
                  description: '주문ID' 
                },
                user_id: { 
                  type: 'number', 
                  example: 2,
                  description: '회원ID' 
                },
                delivery_date: { 
                  type: 'string', 
                  format: 'date',
                  example: '2025-02-18',
                  description: '배송 날짜' 
                },
                total_amount: { 
                  type: 'number', 
                  example: 10800,
                  description: '주문 총 금액' 
                },
                options: {
                  type: 'array',
                  description: '주문 상품 목록',
                  items: {
                    type: 'object',
                    properties: {
                      product_id: { 
                        type: 'number', 
                        example: 1,
                        description: '상품ID' 
                      },
                      product_name: { 
                        type: 'string', 
                        example: '가정식 도시락',
                        description: '상품명' 
                      },
                      quantity: { 
                        type: 'number', 
                        example: 10,
                        description: '수량' 
                      },
                      amount: { 
                        type: 'number', 
                        example: 10000,
                        description: '상품 총 금액' 
                      },
                      origin_price: { 
                        type: 'number', 
                        example: 1000,
                        description: '원상품 가격' 
                      },
                      setting_price: { 
                        type: 'number', 
                        example: 100,
                        description: '회원별 설정 가격' 
                      },
                      is_setting: { 
                        type: 'boolean', 
                        example: true,
                        description: '회원별 가격 설정 여부' 
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
                example: 14,
                description: '전체 수' 
              },
              total_pages: { 
                type: 'number', 
                example: 2,
                description: '전체 페이지 수' 
              },
              current_page: { 
                type: 'number', 
                example: 2,
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