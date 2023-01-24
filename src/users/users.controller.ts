import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    async getUsers() {
        try {
            console.log("get users");
        //   const {rows, count} = await this.userService.getUsers(req.query);
        //   res.json({
        //     success: true,
        //     data: {
        //       users: rows,
        //       totalCount: count,
        //     },
        //     message: 'List of users fetch successfully',
        //   });
        } catch (error) {
        //   res.status(500).json({
        //     success: false,
        //     message: error.message,
        //   });
        }
      }

      @Post("new")
      async createUser(@Body() body: any) {
        try {
            console.log(body);
        //   const user: User = await this.userService.createUser(req.body);
        //   res.json({
        //     success: true,
        //     user: user,
        //     message: 'User is created successfully',
        //   });
        } catch (error) {
        //   res.status(500).json({
        //     success: false,
        //     message: error.message,
        //   });
        }
      }

      @Put("update/:id")
      async updateUser(@Param('id') id: string, @Body() body: any) {
        try {
            console.log(id);
            console.log(body);
        //   const id: string = req.params.id;
        //   const user: User = await this.userService.getUserById(id);
        //   if (!user) {
        //     return res.status(500).json({
        //       success: false,
        //       message: "User doesn't exists",
        //     });
        //   }
        //   const updatedUser: User = await this.userService.updateUser(id, req.body);
        //   res.json({
        //     success: true,
        //     data: {
        //       user: updatedUser,
        //     },
        //     message: 'User is updated successfully',
        //   });
        } catch (error) {
        //   res.status(500).json({
        //     success: false,
        //     message: error.message,
        //   });
        }
      }
}
