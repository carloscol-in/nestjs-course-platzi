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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/services/products/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all products',
  })
  async getAll() {
    return await this.productsService.findAll();
  }

  @Get('/:id')
  async getSingle(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }

  @Put(':id')
  async update(
    @Body() payload: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.productsService.update(id, payload);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }
}
