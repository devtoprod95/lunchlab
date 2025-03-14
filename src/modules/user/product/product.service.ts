import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProduct } from '../auth/entities/user-product.entity';
import { In, Repository } from 'typeorm';
import { ListProductDto } from './dto/list-product.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userProductRepository: Repository<UserProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}

  async findAll(listProductDto: ListProductDto): Promise<PaginatedResponse<any>> {
    const { page = 1 , take = 10, user_id } = listProductDto;
    const skip = (page - 1) * take;
    
     // 전체 상품 수 조회
    const totalItems = await this.productRepository.count();
    
    // 상품 조회
    const products = await this.productRepository.find({
      skip,
      take
    });
    
    // 상품 ID 목록
    const productIds = products.map(p => p.productId);

    const whereCondition: any = {
      product: { productId: In(productIds) },
      hidden: false
    };
    
    if (user_id) {
      whereCondition.user = { id: user_id };
    }

    const userProducts = await this.userProductRepository.find({
      where: whereCondition,
      relations: ['user', 'product']
    });

    // 상품 ID를 키로 사용하는 맵 생성
    const userProductsByProductId = {};
    userProducts.forEach(up => {
      const productId = up.product.productId;
      if (!userProductsByProductId[productId]) {
        userProductsByProductId[productId] = [];
      }
      userProductsByProductId[productId].push(up);
    });

    const formattedProducts = products.map(product => {
      const { id, ...productWithoutId } = product;
      const userProductsForThisProduct = userProductsByProductId[product.productId] || [];
      
      return {
        ...productWithoutId,
        userProducts: userProductsForThisProduct.map(up => ({
          id: up.id,
          userId: up.user.id,
          price: up.price,
          hidden: up.hidden
        }))
      };
    });
    
    return {
      items: formattedProducts,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / take),
        currentPage: page,
        take
      }
    };
  }
}
