import { Injectable, Inject } from '@nestjs/common';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private bookRepository: typeof Book,
  ) {}

    // fetch books with pagination
    async getBooks(query): Promise<{count: number; rows: Book[]}> {
        return this.bookRepository.findAndCountAll({
          attributes: {exclude: ['userId']},
          offset: query?.cursor ?? 0,
          limit: query?.limit ?? 10,
        });
      }
    
      async createBook(book: CreateBookDto): Promise<Book> {
        return this.bookRepository.create({
          ...book,
        });
      }
    
      async getBookById(id: number): Promise<Book> {
        return this.bookRepository.findOne({
          where: {
            id,
          },
          raw: true,
        });
      }
    
      async deleteBook(id: number): Promise<number> {
        return this.bookRepository.destroy({
          where: {
            id,
          },
        });
      }
    
      /*
       * Update Book data
       */
      async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
        await this.bookRepository.update(
          {
            ...bookData,
          },
          {
            where: {
              id,
            },
          },
        );
    
        return this.getBookById(id);
      }
}
