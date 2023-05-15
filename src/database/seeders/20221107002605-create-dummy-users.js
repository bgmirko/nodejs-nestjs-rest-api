'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
        firstName: 'Petar',
        lastName: 'Petrovic',
        username: 'petar80',
        password: await bcrypt.hash('test123', 12),
        email: 'petar@gmail.com',
        role: 'Admin',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf26e',
        firstName: 'Kristina',
        lastName: 'Markovic',
        username: 'kristina_ma',
        password: await bcrypt.hash('test123', 12),
        email: 'kristina@gmail.com',
        role: 'Author',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: '956b086d-f22d-43a3-8966-77d412555cc6',
        firstName: 'Marko',
        lastName: 'Kolarevic',
        username: 'marko.kolar',
        password: await bcrypt.hash('test123', 12),
        email: 'marko@gmail.com',
        role: 'Author',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
        firstName: 'Ana',
        lastName: 'Zaric',
        username: 'anaana',
        password: await bcrypt.hash('test123', 12),
        email: 'ana@gmail.com',
        role: 'Admin',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
