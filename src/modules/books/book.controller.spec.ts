import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { RequestCustom } from '../../utils/definitions';
import { users } from '../../dummy/users';
import { books } from '../../dummy/books';
import { NotFoundException } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;

  const mockBookService = {
    getBookById: jest.fn((id: number) => (books[0])),
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
