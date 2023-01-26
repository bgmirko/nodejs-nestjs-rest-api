import { Module } from '@nestjs/common';
import { BookModule } from './modules/books/book.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [UsersModule, BookModule]
})
export class AppModule {}
