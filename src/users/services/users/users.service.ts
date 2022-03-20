import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/users/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { ProductsService } from 'src/products/services/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    return tasksCollection.find().toArray();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}