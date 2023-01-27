const jwt = require('jsonwebtoken');
import { RequestCustom } from '../utils/enums';
import { User } from '../modules/users/user.entity';
import { Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticateUserToken implements NestMiddleware {
  async use(req: RequestCustom, res: Response, next: NextFunction) {
    console.log("usao")
    const authHeader: string = req.headers['authorization'];
    const token: string = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token) {
      jwt.verify(token, "754819d3ded9b9716478ae3c3b0047dd586b444e548783d58fea09bf4dc1f86196f426fbeeb84e03ada02266dcd6f83bcce0d7cd7ade3ced08a831b7d2bf7467", (err, user: User) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
      });
    } else {
      next();
    }
  }
}
