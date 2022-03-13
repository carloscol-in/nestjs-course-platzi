import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
