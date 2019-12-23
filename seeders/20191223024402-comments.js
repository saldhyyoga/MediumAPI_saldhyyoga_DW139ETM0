"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("comments", [
      {
        comment: "hello",
        is_published: true,
        is_archived: false,
        article_id: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment: "hello, this is second comment",
        is_published: true,
        is_archived: false,
        article_id: 2,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        comment: "hello, this is third comment",
        is_published: true,
        is_archived: false,
        article_id: 3,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("comments", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
