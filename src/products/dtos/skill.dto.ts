import { IsNotEmpty, IsString } from "class-validator";

export class Skills {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    color: string;
}