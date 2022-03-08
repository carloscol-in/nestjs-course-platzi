import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateProductDto } from 'src/products/dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  getSingle(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Body() payload: object, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
