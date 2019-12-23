"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Programming",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Android Dev",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Web Dev",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Artificial Intellegence",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Data Science",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cybersecurity",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Machine Learning",
        is_published: true,
        is_archived: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "UI/UX",
        is_published: true,
        is_archived: false,
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
    return queryInterface.bulkDelete("categories", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
