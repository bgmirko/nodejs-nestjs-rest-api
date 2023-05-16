'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        userUid: '956b086d-f22d-43a3-8966-77d412555c3e',
        title: 'The Night Ship',
        publisher: 'Laguna',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
        genre: 'Science fiction',
        numberOfPages: 298,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '956b086d-f22d-43a3-8966-77d412555c3e',
        title: 'The Light Pirate',
        publisher: 'Vulcan',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        genre: 'Adventure',
        numberOfPages: 176,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf26e',
        title: 'The Winners',
        publisher: 'BOOKA',
        description:
          'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
        genre: 'Classic',
        numberOfPages: 483,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf26e',
        title: 'Desert Star',
        publisher: 'Besani',
        description:
          'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested',
        genre: 'Adventure',
        numberOfPages: 320,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '956b086d-f22d-43a3-8966-77d412555cc6',
        title: 'It Ends with Us',
        publisher: 'Laguna',
        description:
          "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text",
        genre: 'Drama',
        numberOfPages: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '956b086d-f22d-43a3-8966-77d412555cc6',
        title: "She's Gone",
        publisher: 'Vulcan',
        description:
          'words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature',
        genre: 'Drama',
        numberOfPages: 205,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
        title:
          'Sweet Success: A Simple Recipe to Turn Your Passion into Profit',
        publisher: 'BOOKS',
        description:
          'to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition',
        genre: 'Psephology',
        numberOfPages: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userUid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
        title: 'The Choice',
        publisher: 'BeoBook',
        description:
          'more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered',
        genre: 'Adventure',
        numberOfPages: 380,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
