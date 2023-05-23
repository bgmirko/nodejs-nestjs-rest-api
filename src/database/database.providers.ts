import { Sequelize } from 'sequelize-typescript';
import { Book } from '../modules/books/book.entity';
import { User } from '../modules/users/user.entity';
const config = require('./config/config.js');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const env = process.env.NODE_ENV || 'development';
      const sequelize = new Sequelize(config[env]);
      sequelize.addModels([User, Book]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
