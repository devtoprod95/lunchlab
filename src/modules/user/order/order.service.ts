import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { User } from '../auth/entities/user.entity';
import { Product } from '../product/entities/product.entity';

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

  async create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
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
    const savedOrder = await this.orderRepository.save(order);
    
    for (const item of items) {
      // 이미 검증된 상품 찾기
      const product = products.find(p => p.productId === item.productId)!;
      
      // 주문 상품 생성
      const orderProduct = new OrderProduct();
      orderProduct.order = savedOrder;
      orderProduct.product = product;
      orderProduct.quantity = item.quantity;
      
      // 주문 상품 저장
      await this.orderProductRepository.save(orderProduct);
    }
    
    // 관계가 포함된 주문 객체 조회하여 반환
    return this.orderRepository.findOneOrFail({
      where: { id: savedOrder.id },
      relations: ['user', 'orderProducts', 'orderProducts.product']
    });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
