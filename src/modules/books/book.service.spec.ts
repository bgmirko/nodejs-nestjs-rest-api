import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { DatabaseModule } from '../../database/database.module';
import { bookProviders } from './book.providers';
import { populateTestDatabase } from '../../database/tests/populateTestDatabase';

describe('BooksService', () => {
  let service: BookService;
  const mockBookRepository = {};

  beforeEach(async () => {
    await populateTestDatabase();

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [BookService, ...bookProviders],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Expect to get data from database', async () => {
    const result = await service.getBookById(1);
    console.log('result --------->', result);
    expect(typeof result).toBe('object');
  });
});
