import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/modules/books/book.entity';
import { User } from "../modules/users/user.entity";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([User, Book]);
      await sequelize.sync();
      return sequelize;
    },
  },
];