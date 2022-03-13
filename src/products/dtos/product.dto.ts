import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from 'src/products/dtos/category.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: CreateCategoryDto;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @Min(2)
  limit: number;
  
  @IsOptional()
  offset: number;

  @IsOptional()
  @Min(-1)
  minPrice: number;
  
  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}