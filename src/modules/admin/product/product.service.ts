import { BadRequestException, Injectable } from '@nestjs/common';
import { UpsertProductDto } from './dto/upsert-product-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/user/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/auth/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserProduct } from 'src/modules/user/auth/entities/user-product.entity';

@Injectable()
export class AdminProductService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
      @InjectRepository(UserProduct)
      private readonly userProductRepository: Repository<UserProduct>,
      private readonly configService: ConfigService,
  ){}

  async upsert(upsertProductDto: UpsertProductDto): Promise<UserProduct> {
    const { productId, userId, price, hidden } = upsertProductDto;

    const product = await this.productRepository.findOne({
        where: {
          productId
        }
    });
    if( !product ){
        throw new BadRequestException('없는 상품입니다.');
    }

    const user = await this.userRepository.findOne({
        where: {
          id: userId
        }
    });
    if( !user ){
        throw new BadRequestException('없는 회원입니다.');
    }

    if( price === undefined && hidden === undefined ){
      throw new BadRequestException(`price 또는 hidden 속성 중 하나는 반드시 요청에 포함되어야 합니다.`);
    }

    const userProduct = await this.userProductRepository.findOne({
      where: {
        product: { id: product.id },
        user: { id: user.id }
      }
    });

    if (!userProduct) {
      // 새로 생성하는 경우
      await this.userProductRepository.save({
        product,
        user,
        price: price !== undefined ? price : product.price,
        hidden: hidden !== undefined ? hidden : false
      });
    } else {
      // 업데이트하는 경우
      const updateData: any = {
        id: userProduct.id
      };
      
      // 정의된 필드만 업데이트
      if (price !== undefined) {
        updateData.price = price;
      }
      if (hidden !== undefined) {
        updateData.hidden = hidden;
      }
      await this.userProductRepository.save(updateData);
    }

    return await this.userProductRepository.findOne({
        where: {
            product: { id: productId },
            user: { id: userId }
        },
        relations: ['user', 'product']
    }) as UserProduct;
  }
}
