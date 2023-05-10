import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { users } from '../../dummy/users';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'modules/users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserService = {
    getUsers: jest.fn(() => users),
    createUser: jest.fn(() => users[0]),
    getUserById: jest.fn((uuid: string) =>
      users.find((user) => user.uuid === uuid),
    ),
    updateUser: jest.fn((uuid: string, body: Partial<User>) => {
      const user = users.find((user) => user.uuid === uuid);
      return { ...user, ...body };
    }),
    softDeleteUser: jest.fn((uuid: string) => 1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get users should return users', async () => {
    const mockQuery = {};
    const users = await controller.getUsers(mockQuery);
    expect(Array.isArray(users)).toBeTruthy();
  });

  it('should create user', async () => {
    const user = await controller.createUser(users[0] as CreateUserDto);
    expect(user).toBe(users[0]);
  });

  it('should update user', async () => {
    const mockBody = {
      email: 'petar_new@gmail.com',
    };
    const user = await controller.updateUser(users[0].uuid, mockBody);
    expect(user.email).toBe(mockBody.email);
  });

  it(`try to update user which doesn't exist should throw error`, async () => {
    const mockBody = {
      email: 'petar_new@gmail.com',
    };
    await expect(
      controller.updateUser('956b086d-f22d-43a3-8966-77dnotexist', mockBody),
    ).rejects.toThrow(NotFoundException);
    await expect(
      controller.updateUser('956b086d-f22d-43a3-8966-77dnotexist', mockBody),
    ).rejects.toThrow(`User doesn't exists`);
  });

  it('should delete user', async () => {
    const result = (await controller.softDeleteUser(users[2].uuid)) as {
      success: boolean;
      message: string;
    };

    expect(result.success).toBeTruthy();
    expect(result.message).toBe('User is deleted successfully');
  });

  it(`try to delete user which doesn't exist should throw error`, async () => {
    await expect(
      controller.softDeleteUser('956b086d-f22d-43a3-8966-77dnotexist'),
    ).rejects.toThrow(NotFoundException);
    await expect(
      controller.softDeleteUser('956b086d-f22d-43a3-8966-77dnotexist'),
    ).rejects.toThrow(`User doesn't exists`);
  });

  it(`try to delete active admin user will not succeed`, async () => {
    const result = (await controller.softDeleteUser(users[0].uuid)) as {
      success: boolean;
      message: string;
    };

    expect(result.success).toBeFalsy();
    expect(result.message).toBe(
      'You are not able to delete user with Admin role which is active',
    );
  });
});
