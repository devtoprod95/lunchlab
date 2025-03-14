import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { UserProduct } from './entities/user-product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderProduct } from '../order/entities/order-product.entity';
import { TestBed } from '@automock/jest';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service               : AuthService;
  let userRepository        : jest.Mocked<Repository<User>>;
  let productRepository     : jest.Mocked<Repository<Product>>;
  let userProductRepository : jest.Mocked<Repository<UserProduct>>;
  let orderRepository       : jest.Mocked<Repository<Order>>;
  let orderProductRepository: jest.Mocked<Repository<OrderProduct>>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(AuthService).compile();

    service                 = unit;
    userRepository          = unitRef.get(getRepositoryToken(User) as string);
    productRepository       = unitRef.get(getRepositoryToken(Product) as string);
    userProductRepository   = unitRef.get(getRepositoryToken(UserProduct) as string);
    orderRepository         = unitRef.get(getRepositoryToken(Order) as string);
    orderProductRepository  = unitRef.get(getRepositoryToken(OrderProduct) as string);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
