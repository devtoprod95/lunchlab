import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProduct } from '../auth/entities/user-product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ListProductDto } from './dto/list-product.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userProductRepository: Repository<UserProduct>,
  ){}

  async findAll(listProductDto: ListProductDto): Promise<PaginatedResponse<UserProduct>> {
    const { page, take, user_id } = listProductDto;

    // skip 계산 (0부터 시작)
    const skip = (page - 1) * take;
    
    // 조건 설정
    const where: FindOptionsWhere<UserProduct> = {
      hidden: false
    };
    
    // user_id가 제공된 경우 조건에 추가
    if (user_id) {
      where.user = { id: user_id };
    }

    // 전체 항목 수 조회
    const totalItems = await this.userProductRepository.count({ where });

    // 페이지네이션된 데이터 조회
    const userProducts = await this.userProductRepository.find({
      where,
      relations: ['user', 'product'],
      skip,
      take
    });

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalItems / take);
  

    return {
      items: userProducts,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        take
      }
    };
  }
}
