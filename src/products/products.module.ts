import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products/products.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { UsersModule } from 'src/users/users.module';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [forwardRef(() => UsersModule), MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },
    {
      name: Brand.name,
      schema: BrandSchema,
    }
  ])],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
