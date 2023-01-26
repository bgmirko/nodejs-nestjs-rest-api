import { IsString, IsNumber } from "class-validator";

export class CreateBookDto {
    @IsString()
    userUid: string;
    @IsString()
    title: string;
    @IsString()
    publisher: string;
    @IsString()
    description: string;
    @IsString()
    genre: string;
    @IsNumber()
    numberOfPages: number;
}