"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        fullname: "saldhy yoga prathama",
        username: "saldhyy",
        email: "saldhyy@gmail.com",
        password: "saldhy123",
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: "saldhy yoga",
        username: "saldhyyoga",
        email: "saldhyyoga@gmail.com",
        password: "saldhy123",
        is_active: true,
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
    return queryInterface.bulkDelete("users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
