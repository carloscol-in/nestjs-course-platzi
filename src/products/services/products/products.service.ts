import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entities/product.entity';
import { AbstractCrudService } from 'src/common/abstracts/services/crud-service.abstract';

@Injectable()
export class ProductsService extends AbstractCrudService<number> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
