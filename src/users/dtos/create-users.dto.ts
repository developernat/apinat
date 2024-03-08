import { IsNotEmpty, IsString } from "class-validator";


export class CreateUsersDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
}