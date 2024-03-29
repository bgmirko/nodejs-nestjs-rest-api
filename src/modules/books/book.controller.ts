import {
  Controller,
  Query,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book';
import {
  RequestCustom,
  RoleType,
  TokenUserPayload,
} from '../../utils/definitions';
import { AdminGuard } from '../../guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../interceptors/consoleLogging.interceptor';
import { UpdateBookDto } from './dtos/update-book';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(@Query() query) {
    const { rows, count } = await this.bookService.getBooks(query);
    return {
      success: true,
      data: {
        books: rows,
        totalCount: count,
      },
      message: 'List of books fetch successfully',
    };
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseInterceptors(LoggingInterceptor)
  @UseGuards(AdminGuard)
  async getBook(@Param('id') id: number) {
    const book = await this.bookService.getBookById(id);
    return {
      success: true,
      data: {
        book: book,
      },
      message: 'Book fetched successfully',
    };
  }

  @Post()
  async createBook(@Body() body: CreateBookDto) {
    const book = await this.bookService.createBook(body);
    return {
      success: true,
      book: book,
      message: 'Book is created successfully',
    };
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: number, @Req() req: RequestCustom) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException("Book doesn't exists");
    }
    const userData: TokenUserPayload = req.user;
    if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
      return {
        success: false,
        message: 'Author Role can delete only own books',
      };
    }
    await this.bookService.deleteBook(id);
    return {
      success: true,
      message: 'Book is deleted successfully',
    };
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id: number,
    @Body() body: UpdateBookDto,
    @Req() req: RequestCustom,
  ) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException("Book doesn't exists");
    }
    const userData: TokenUserPayload = req.user;
    if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
      return {
        success: false,
        message: 'Author Role can update only own books',
      };
    }
    const updatedBook = await this.bookService.updateBook(id, body);
    return {
      success: true,
      data: {
        book: updatedBook,
      },
      message: 'Book is updated successfully',
    };
  }
}
