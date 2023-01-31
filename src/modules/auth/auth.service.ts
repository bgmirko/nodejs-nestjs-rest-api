import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import {
  generateAccessToken,
  generateRefreshAccessToken,
} from 'src/utils/jwtToken';
import { TokenUserPayload, TokenData } from '../../utils/enums';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async loginUser(body: any) {
    const password: string = body.password;
    const username: string = body.username;

    const user = await this.userService.getUserByUsername(username);

    if (user == null) {
      return new NotFoundException("User doesn't exists");
    }

    if (!user.active) {
      return {
        success: false,
        message: 'Your account is deactivated',
      };
    }

    if (await compare(password, user.password)) {
      const userTokenData: TokenUserPayload = {
        uuid: user.uuid,
        role: user.role,
      };
      const accessToken = generateAccessToken(userTokenData);
      const refreshToken = generateRefreshAccessToken(userTokenData);
      return {
        success: true,
        accessToken,
        refreshToken,
        message: 'User login successfully',
      };
    } else {
      return {
        success: false,
        message: 'Username or password are not correct',
      };
    }
  }

  async refreshToken(body: any) {
    if (!body.refreshToken) {
      throw new Error('refreshToken missing');
    }

    jwt.verify(
      body.refreshToken,
      process.env.ACCESS_TOKEN_SECRET, 
      (err: any, userTokenData: TokenData) => {
        if (err) {
          return {
            error: 'Error',
          };
        }

        const tokenUserPayload: TokenUserPayload = {
          uuid: userTokenData.uuid,
          role: userTokenData.role,
        };

        // TODO refresh token should be stored in database

        // if refresh token is valid create new token and refresh token
        const accessToken: string = generateAccessToken(tokenUserPayload);
        const refreshToken: string =
          generateRefreshAccessToken(tokenUserPayload);
        return {
          success: true,
          accessToken,
          refreshToken,
          message: 'Token refreshed successfully',
        };
      },
    );
  }
}
