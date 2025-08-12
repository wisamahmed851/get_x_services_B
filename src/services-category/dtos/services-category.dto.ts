import { IsNotEmpty, IsOptional } from "class-validator";

export class ServicesCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    image?: string;
}