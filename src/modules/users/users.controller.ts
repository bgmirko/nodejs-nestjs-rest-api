import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { RoleType } from 'src/utils/enums';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(@Query() query) {
    console.log(query);
    return this.userService.getUsers(query);
  }

  @Post('new')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  // TODO "update" in route is unnecessary
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException("User doesn't exists");
    }
    return this.userService.updateUser(id, body);
  }

  // TODO "delete" in route is unnecessary
  @Delete("delete/:id")
  async softDeleteUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return new NotFoundException("User doesn't exists");
    }
    if (user.role === RoleType.Admin && user.active) {
      return {
        success: false,
        message:
          'You are not able to delete user with Admin role which is active',
      };
    }
    await this.userService.softDeleteUser(id);
    return {
      success: true,
      message: 'User is deleted successfully',
    };
  }
}
