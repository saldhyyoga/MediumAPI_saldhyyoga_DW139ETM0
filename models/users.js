"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    // users.belongsToMany(models.articles, {
    //   as: "Article",
    //   foreignKey: "author_id"
    // });
  };
  return users;
};
