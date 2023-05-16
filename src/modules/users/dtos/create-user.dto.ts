import { IsString, IsEmail, IsBoolean, IsEnum } from 'class-validator';
import { RoleType } from '../../../utils/definitions';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'role', enum: RoleType })
  @IsEnum(RoleType)
  role: RoleType;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
