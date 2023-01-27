import jwt from 'jsonwebtoken';
import {TokenUserPayload} from './enums';

export const generateAccessToken = (user: TokenUserPayload) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'}); // TODO change to 10m
};

export const generateRefreshAccessToken = (user: TokenUserPayload) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
};
