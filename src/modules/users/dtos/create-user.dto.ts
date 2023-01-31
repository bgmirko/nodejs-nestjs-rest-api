import { IsString, IsEmail, IsBoolean, IsEnum } from "class-validator";
import { RoleType } from "src/utils/definitions";

export class CreateUserDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsEmail()
    email: string;
    @IsEnum(RoleType)
    role: RoleType;
    @IsBoolean()
    active: boolean;
}