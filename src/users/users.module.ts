import { forwardRef, Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

import { ProductsModule } from 'src/products/products.module';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './controllers/orders/orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersService } from './services/orders/orders.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [forwardRef(() => ProductsModule), MongooseModule.forFeature([
    {
      name: Customer.name,
      schema: CustomerSchema,
    },
    {
      name: Order.name,
      schema: OrderSchema,
    },
    {
      name: User.name,
      schema: UserSchema,
    }
  ])],
  controllers: [CustomerController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
