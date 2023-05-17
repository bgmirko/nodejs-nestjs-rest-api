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
import { RoleType } from '../../utils/definitions';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiBearerAuth()
  @Get('/whoami')
  async whoAmI(
    @CurrentUser({ example: 'data to send to decorator' }) user: User,
  ) {
    return user;
  }

  @Get()
  async getUsers(@Query() query) {
    return this.userService.getUsers(query);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException("User doesn't exists");
    }
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async softDeleteUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException("User doesn't exists");
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
