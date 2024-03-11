import {   IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { gender, status } from "../schemas/users.schema";


export class CreateUsersDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    birthdate: Date
    @IsEnum(gender)
    gender: gender
    @IsString()
    phone: string
    age: number

    status: any

}