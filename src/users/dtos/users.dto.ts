import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    image: string;
}