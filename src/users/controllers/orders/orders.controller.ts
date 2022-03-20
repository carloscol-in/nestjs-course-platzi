import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from 'src/users/services/orders/orders.service';
import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from 'src/users/dtos/order.dto';
  
  @ApiTags('orders')
  @Controller('orders')
  export class OrdersController {
    constructor(private ordersService: OrdersService) {}
  
    @Get()
    findAll() {
      return this.ordersService.findAll();
    }
  
    @Get(':id')
    get(@Param('id') id: string) {
      return this.ordersService.findOne(id);
    }
  
    @Post()
    create(@Body() payload: CreateOrderDto) {
      return this.ordersService.create(payload);
    }

    @Post(':orderId/product/:productId')
    async addProduct(@Param('orderId') orderId: string, @Param('productId') productId: string) {
      return await this.ordersService.addProduct(orderId, productId);
    }

    @Post(':orderId/product')
    async addProducts(@Param('orderId') orderId: string, @Body() productsIds: AddProductsToOrderDto) {
      return await this.ordersService.addProducts(orderId, productsIds.productsIds);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
      return this.ordersService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.ordersService.remove(id);
    }

    @Delete(':orderId/product/:productId')
    async removeProduct(@Param('orderId') orderId: string, @Param('productId') productId: string) {
      return await this.ordersService.removeProduct(orderId, productId);
    }
  }