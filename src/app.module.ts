import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BookModule } from './modules/books/book.module';
import { UsersModule } from './modules/users/users.module';
import { AuthenticateUserToken } from 'middlewares/authenticateToken.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, BookModule, AuthModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateUserToken).forRoutes('books', 'users');
  }
}
