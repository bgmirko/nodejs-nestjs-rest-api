import { verify } from 'jsonwebtoken';
import { RequestCustom } from '../utils/definitions';
import { User } from '../modules/users/user.entity';
import { Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticateUserToken implements NestMiddleware {
  use(req: RequestCustom, res: Response, next: NextFunction) {
    console.log('---> enter in middleware');
    const authHeader: string = req.headers['authorization'];
    const token: string = authHeader && authHeader.split(' ')[1];
    if (token) {
      verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user: User) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
      });
    } else {
      next();
    }
  }
}
