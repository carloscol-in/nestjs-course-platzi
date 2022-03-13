import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = await this.productModel.create(payload);

    return newProduct;
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, {
        $set: payload
      },
      {
        new: true,
      })
      .exec();

    if(!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async delete(id: string) {
    return await this.productModel.findByIdAndRemove(id);
  }
}
