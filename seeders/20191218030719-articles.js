"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("articles", [
      {
        title: "Polymorphism in golang interfaces",
        content: "Polymorphism in golang interfaces",
        image: "azzzzz",
        category_id: 1,
        category_name: "programming",
        is_published: true,
        is_archived: false,
        slug: "programming golang",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "React in javascript",
        content: "learn fundamental before learning react",
        image: "reactfundamental",
        category_id: 1,
        category_name: "programming",
        is_published: true,
        is_archived: false,
        slug: "react javascript",
        author_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "use redux for better state management",
        content: "redux magic tool for react",
        image: "imageredux",
        category_id: 1,
        category_name: "programming",
        is_published: true,
        is_archived: false,
        slug: "react redux",
        author_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "how to be junior android dev",
        content: "roadmap to be android dev",
        image: "img.com/androiddev",
        category_id: 2,
        category_name: "Android Dev",
        is_published: true,
        is_archived: false,
        slug: "android dev",
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 2
      },
      {
        title: "how to be senior web dev",
        content: "roadmap to be senior web dev",
        image: "img.com/webdev",
        category_id: 2,
        category_name: "Web Dev",
        is_published: true,
        is_archived: false,
        slug: "web dev",
        createdAt: new Date(),
        updatedAt: new Date(),
        author_id: 1
      },
      {
        title: "ux engineer",
        content: "ux engineer",
        image: "ux.com/ux",
        category_id: 1,
        category_name: "programming",
        is_published: true,
        is_archived: false,
        slug: "ux engineer",
        author_id: 2,
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
    return queryInterface.bulkDelete("articles", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
