import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from '../../utils/definitions';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService){}


  @Post('login')
  async loginUser(@Body() body: LoginRequestBody) {
    return this.authService.loginUser(body);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body) {
    return this.authService.refreshToken(body);
  }
}
