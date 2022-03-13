import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products/products.service';
import { CreateProductDto, FilterProductsDto } from 'src/products/dtos/product.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all products',
  })
  async getAll(
    @Query() params: FilterProductsDto,
  ) {
    return await this.productsService.findAll(params);
  }

  @Get('/:id')
  async getSingle(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }

  @Put(':id')
  async update(@Body() payload: object, @Param('id', MongoIdPipe) id: string) {
    return await this.productsService.update(id, payload);
  }

  @Delete(':id')
  async destroy(@Param('id', MongoIdPipe) id: string) {
    return await this.productsService.delete(id);
  }
}
