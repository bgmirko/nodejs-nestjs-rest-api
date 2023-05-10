import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ResponseTokenData } from '../../utils/definitions';
import { NotFoundException } from '@nestjs/common';
require('dotenv').config();

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService;

  beforeEach(async () => {
    // Create a fake copy of the user service
    fakeUserService = {
      getUserByUsername: (username: string) =>
        Promise.resolve({
          uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
          firstName: 'Petar',
          lastName: 'Petrovic',
          username: 'petar80',
          password:
            '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
          email: 'petar@gmail.com',
          role: 'Admin',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deleteAt: null,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('log user with correct email i password should be success', async () => {
    const result = (await service.loginUser({
      username: 'petar80',
      password: 'test123',
    })) as ResponseTokenData;
    expect(result.success).toBeTruthy();
  });

  it('log user with wrong email i password should be falsy', async () => {
    const result = (await service.loginUser({
      username: 'petar80',
      password: 'wrongPassword',
    })) as ResponseTokenData;
    expect(result.success).toBeFalsy();
  });

  it(`log user with username which doesn't exist should throw error`, async () => {
    fakeUserService.getUserByUsername = (username: string) =>
      Promise.resolve(null);
    const result = (await service.loginUser({
      username: 'UsernameNotExists',
      password: 'test123',
    })) as NotFoundException;
    expect(result.getStatus()).toBe(404);
  });
});
