import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return product;
  }

  // create(payload: CreateProductDto) {
  //   const newId = ++this.counter;
  //   const newProduct = {
  //     id: newId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const idx = this.products.findIndex((item) => item.id == id);

  //   if (idx === -1) return false;

  //   this.products[idx] = {
  //     ...this.products[idx],
  //     ...payload,
  //   };

  //   return {
  //     id,
  //     payload,
  //   };
  // }

  // delete(id: number) {
  //   const idx = this.products.findIndex((item) => item.id == id);

  //   this.products.splice(idx, 1);

  //   return id;
  // }
}
