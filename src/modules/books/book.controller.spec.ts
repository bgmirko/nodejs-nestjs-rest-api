import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { RequestCustom, RoleType } from '../../utils/definitions';
import { User } from 'modules/users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;

  const users: Partial<User>[] = [
    {
      uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
      firstName: 'Petar',
      active: true,
      lastName: 'Petrovic',
      username: 'petar80',
      password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
      email: 'petar@gmail.com',
      role: RoleType.Admin,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      uuid: '333b086d-f22d-43a3-8966-77d412555tgy',
      firstName: 'Ivana',
      active: true,
      lastName: 'Mandic',
      username: 'ivana_fx',
      password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
      email: 'ivana@gmail.com',
      role: RoleType.Author,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  const mockBookService = {
    getBookById: jest.fn((id: number) => ({
      id: 1,
      userUid: '956b086d-f22d-43a3-8966-77d412555c3e',
      title: 'The Night Ship',
      publisher: 'Laguna',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
      genre: 'Science fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    deleteBook: jest.fn((id: number) => 1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`Admin try to delete book will be successful`, async () => {
    const mockRequest = {
      user: users[0],
    } as any as RequestCustom;

    const result = await controller.deleteBook(1, mockRequest);

    expect(result.success).toBeTruthy();
    expect(result.message).toBe('Book is deleted successfully');
  });

  it(`Author try to delete book which he didn't write will not succeed`, async () => {
    const mockRequest = {
      user: users[1],
    } as any as RequestCustom;

    const result = await controller.deleteBook(1, mockRequest);

    expect(result.success).toBeFalsy();
    expect(result.message).toBe('Author Role can delete only own books');
  });

  it(`Admin try to delete book which doesn't exist will throw error`, async () => {
    const mockRequest = {
      user: users[0],
    } as any as RequestCustom;

    mockBookService.getBookById = jest.fn((id: number) => null)

    await expect(controller.deleteBook(1, mockRequest)).rejects.toThrow(NotFoundException);
    await expect(controller.deleteBook(1, mockRequest)).rejects.toThrow(`Book doesn't exists`);    
  });
});
