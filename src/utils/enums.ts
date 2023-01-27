import { User } from '../modules/users/user.entity';

export enum RoleType {
  Admin = 'Admin',
  Author = 'Author',
}

export interface RequestCustom extends Request {
  user: User;
}

export interface TokenUserPayload {
  uuid: string;
  role: RoleType;
}

export interface TokenData {
  uuid: string;
  role: RoleType;
  iat: string;
  exp: string;
}
