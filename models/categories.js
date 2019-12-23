"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  categories.associate = function(models) {
    categories.hasMany(models.articles, {
      as: "Article",
      foreignKey: "category_id"
    });
    // associations can be defined here
  };
  return categories;
};
