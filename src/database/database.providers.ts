import { Sequelize } from 'sequelize-typescript';
import { Book } from 'src/modules/books/book.entity';
import { User } from "../modules/users/user.entity";

//TODO put in env file
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'qsoftware',
      });
      sequelize.addModels([User, Book]);
      await sequelize.sync();
      return sequelize;
    },
  },
];