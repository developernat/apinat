import { IsEnum, IsNotEmpty, IsOptional, IsString, isNotEmpty } from "class-validator";
import { status } from "../schemas/users.schema";

export class UpdateUsersDto {

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email: string;

    @IsEnum(status)
    @IsOptional()
    status: status

    updatedAt: Date;

}