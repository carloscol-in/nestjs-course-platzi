import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a cool product',
      price: 12,
      stock: 2,
      image: 'http://exampleimg.com/640/480',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id=${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newId = ++this.counter;
    const newProduct = {
      id: newId,
      ...payload,
    };
    this.products.push(newProduct);
  }

  update(id: number, payload: UpdateProductDto) {
    const idx = this.products.findIndex((item) => item.id === id);

    if (idx === -1) return false;

    this.products[idx] = {
      ...this.products[idx],
      ...payload,
    };

    return {
      id,
      payload,
    };
  }

  delete(id: number) {
    const idx = this.products.findIndex((item) => item.id === id);

    this.products.splice(idx, 1);

    return id;
  }
}
