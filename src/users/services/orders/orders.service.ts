import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from 'src/users/entities/order.entity';
import { AddProductsToOrderDto, CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products').exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(orderId: string, productId: string) {
    const order = await this.orderModel.findById(orderId);
    order.products.pull(productId);
    return await order.save();
  }

  async addProduct(orderId: string, productId: string) {
    const order = await this.orderModel.findById(orderId);
    order.products.push(productId);
    return await order.save();
  }

  async addProducts(orderId: string, productsIds: string[]) {
    const order = await this.orderModel.findById(orderId);
    productsIds.forEach((productId) => order.products.push(productId));
    return await order.save();
  }
}