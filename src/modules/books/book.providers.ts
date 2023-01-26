import { Book } from './book.entity';

export const bookProviders = [{ provide: 'BOOKS_REPOSITORY', useValue: Book }];