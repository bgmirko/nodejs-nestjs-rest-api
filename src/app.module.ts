import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BookModule } from './modules/books/book.module';
import { UsersModule } from './modules/users/users.module';
import { AuthenticateUserToken } from './middlewares/authenticateToken.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, BookModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateUserToken).forRoutes(
        'books', "users"
    );
  }
}
