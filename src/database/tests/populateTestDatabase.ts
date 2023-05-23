import { Sequelize } from 'sequelize-typescript';
import { Book } from '../../modules/books/book.entity';
import { User } from '../../modules/users/user.entity';
import { RoleType } from '../../utils/definitions';
const config = require('../config/config.js');

export async function populateTestDatabase() {
  const sequelize = new Sequelize(config['test']);

  sequelize.addModels([User, Book]);

  try {
    await sequelize.sync({ force: true }); // Drops existing tables and creates new ones

    await User.create({
      uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
      firstName: 'Ivana',
      active: true,
      lastName: 'Mandic',
      username: 'ivana_fx',
      password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
      email: 'ivana@gmail.com',
      role: RoleType.Admin,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    await Book.create({
      id: 1,
      userUid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
      title: 'The Night Ship 5',
      publisher: 'Laguna',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
      genre: 'Science fiction',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error populating test data:', error);
  } finally {
    await sequelize.close();
  }
}
