import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user';
import { RefreshTokenDto } from './dtos/refres-token';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }
}
