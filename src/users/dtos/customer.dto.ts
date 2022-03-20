import { IsString, IsNotEmpty, IsPhoneNumber, ValidateNested, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Skills } from 'src/products/dtos/skill.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Skills)
  readonly skills: Skills[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
