import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Between, FindOptionsWhere, In, QueryRunner, Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { User } from '../auth/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { PagePaginationDto } from 'src/common/dto/page-pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}

  async create(createOrderDto: CreateOrderDto, userId: number, qr: QueryRunner): Promise<Order> {
    const { deliveryDate, comment, items } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('없는 회원입니다.');
    }

    // 모든 상품 존재 여부 미리 확인
    const productIds = items.map(item => item.productId);
    const products = await this.productRepository.find({
      where: { productId: In(productIds) }
    });
    
    // 찾은 상품 ID 목록
    const foundProductIds = products.map(product => product.productId);
    
    // 존재하지 않는 상품 ID 확인
    const notFoundProductIds = productIds.filter(id => !foundProductIds.includes(id));
    if (notFoundProductIds.length > 0) {
      throw new NotFoundException(`상품 ID ${notFoundProductIds.join(', ')}를 찾을 수 없습니다.`);
    }

    const order = new Order();
    order.deliveryDate = new Date(deliveryDate);
    order.comment = comment;
    order.user = user;
    
    // 주문 저장
    const savedOrder = await qr.manager.save(order);
    
    for (const item of items) {
      // 이미 검증된 상품 찾기
      const product = products.find(p => p.productId === item.productId)!;
      
      // 주문 상품 생성
      const orderProduct = new OrderProduct();
      orderProduct.order = savedOrder;
      orderProduct.product = product;
      orderProduct.quantity = item.quantity;
      
      // 주문 상품 저장
      await qr.manager.save(orderProduct);
    }

    // 관계가 포함된 주문 객체 조회하여 반환
    return qr.manager.findOneOrFail(Order, {
      where: { id: savedOrder.id },
      relations: ['orderProducts']
    });
  }

  async findAll(deliveryDate: string, pagePaginationDto: PagePaginationDto): Promise<PaginatedResponse<any>> {
    const { page = 1, take = 10 } = pagePaginationDto;
  
    // skip 계산 (0부터 시작)
    const skip = (page - 1) * take;

    // 날짜 시작과 끝 계산
    const startDate = new Date(deliveryDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(deliveryDate);
    endDate.setHours(23, 59, 59, 999);
    
    // 조건 설정 - Between 사용
    const where: FindOptionsWhere<Order> = {
      deliveryDate: Between(startDate, endDate)
    };
  
    // 전체 항목 수 조회
    const totalItems = await this.orderRepository.count({ where });
    
    // 페이지네이션된 데이터 조회
    const orders = await this.orderRepository.find({
      where,
      relations: ['orderProducts.product', 'user.userProducts'],
      skip,
      take
    });

    // 응답 형식으로 변환
    const formattedOrders = orders.map(order => {
      const items = order.orderProducts.map(op => {
        const userProduct = order.user.userProducts.find(
          up => up.productId === op.product.productId
        );

        // UserProduct 가격이 있으면 사용, 없으면 Product 가격 사용
        const price = userProduct?.price ?? op.product.price;
        const isSetting = userProduct !== undefined ? true : false;
        
        return {
          productId: op.product.productId,
          productName: op.product.name,
          quantity: op.quantity,
          amount: op.quantity * price,
          originPrice: op.product.price,
          settingPrice: userProduct?.price ?? 0,
          isSetting
        };
      });
      
      const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
      
      return {
        id: order.id,
        userId: order.user.id,
        deliveryDate: order.deliveryDate,
        totalAmount,
        options: items
      };
    });
    
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalItems / take);
    
    // 페이지네이션 응답 반환
    return {
      items: formattedOrders,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        take
      }
    };
  }
}
