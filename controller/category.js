const Category = require("../models").categories;
const Article = require("../models").articles;

exports.index = (req, res) => {
  Category.findAll().then(category => res.send(category));
};

exports.show = (req, res) => {
  Category.findOne({ where: { id: req.params.id } }).then(category =>
    res.send(category)
  );
};

exports.store = (req, res) => {
  Category.create(req.body, {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => res.status(200).send(data));
};

exports.detail = (req, res) => {
  Article.findAll({
    where: { category_id: req.params.id },
    attributes: {
      exclude: [
        "category_id",
        "category_name",
        "is_published",
        "is_archived",
        "slug",
        "author_id"
      ]
    },
    include: [
      {
        model: Category,
        as: "Category",
        attributes: {
          exclude: ["is_published", "is_archived", "createdAt", "updatedAt"]
        }
      }
    ]
  }).then(articles => {
    res.send(articles);
  });
  //   const { id } = req.params.id;
  //   Article.findAll({
  //      attributes: ['id','title','content','image','createdAt','updatedAt'],
  //      include: [{
  //          model: 'Category',
  //          as: 'Category'
  //      }],
  //      where{category_id:id}
  // })
};

// exports.create = (req, res) => {
//   Categories.create(req.body).then(data => {
//     res.send({
//       message: "success",
//       data
//     });
//   });
// };
