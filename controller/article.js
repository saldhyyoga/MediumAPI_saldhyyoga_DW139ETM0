// const jwt = require("jsonwebtoken");
const models = require("../models");
const Article = models.articles;
const Category = models.categories;
const Comment = models.comments;
const User = models.users;

exports.list = (req, res) => {
  Article.findAll({
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
    // order: [["createdAt", "DESC"]],
    // limit: 10
  })
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).json({
        msg: "Internal Server Error",
        Error: err
      });
    });
};

exports.popular = (req, res) => {
  Article.findAll({
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
    ],
    order: [["createdAt", "DESC"]],
    limit: 10
  })
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      res.status(500).json({
        msg: "bad request",
        Error: err
      });
    });
};

exports.store = (req, res) => {
  const { title, content, image, category_id } = req.body;
  Article.create({
    title: title,
    content: content,
    image: image,
    category_id: category_id,
    author_id: userId
  }).then(data =>
    res.send({
      message: "success",
      data
    })
  );
};

exports.detail = (req, res) => {
  // const { id } = ;
  Article.findAll({
    where: { id: req.params.id },
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
          exclude: ["is_archived", "is_published", "createdAt", "updatedAt"]
        }
      },
      {
        model: Comment,
        as: "Comment",
        attributes: {
          exclude: ["is_published", "is_archived", "article_id", "user_id"]
        }
      }
    ]
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).json({
        msg: "Data not found",
        Error: err
      });
    });
};

exports.update = (req, res) => {
  Article.update(req.body, { where: { id: req.params.id } }).then(data => {
    res.send({
      message: "success",
      data
    });
  });
};

exports.delete = (req, res) => {
  Article.destroy({ where: { id: req.params.id } }).then(data => {
    res.send({
      message: "success"
    });
  });
};

// for routing comments
exports.addcomment = (req, res) => {
  const { comment, article_id } = req.body;
  Comment.create({
    comment: comment,
    article_id: article_id,
    user_id: userId
  }).then(data => {
    Comment.findOne({
      attributes: ["id", "comment"],
      include: [
        {
          model: Article,
          as: "Article",
          attributes: ["id", "title"]
        }
      ],
      where: { id: data.id }
    }).then(response => {
      res.send(response);
    });
  });
};

exports.showcomments = (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment", "createdAt", "updatedAt"],
    include: [
      {
        model: Article,
        as: "Article",
        attributes: ["id", "title"]
      }
    ]
  }).then(data => res.send(data));
};

exports.deletecomment = (req, res) => {
  const { id } = req.body;
  Comment.destroy({ where: { id: id } }).then(
    res.status(200).send({ message: "delete comment success" })
  );
};

exports.updatecomment = (req, res) => {
  const { article_id } = req.body;
  Comment.findOne({
    where: { article_id: article_id }
  }).then(data => {
    if (userId !== data.user.id) {
      res.send({ message: "this is not your comment" });
    }
    Comment.update({});
  });
};

exports.showArticlesByUser = (req, res) => {
  const { user_id } = req.params.id;
  User.findOne({
    where: { id: user_id },
    attributes: {
      exclude: ["email", "password", "is_active", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Article,
        as: "Article",
        attributes: [
          "id",
          "title",
          "content",
          "image",
          "createdAt",
          "updatedAt"
        ]
      },
      {
        model: Category,
        as: "Category",
        attributes: ["id", "name"]
      }
    ]
  }).then(data => {
    res.send(data);
  });
};

// exports.updateComment = (req, res) => {
//   Comment.findOne({
//     where: { id: req.params.id, userId: userId }
//   }).then(respon => {
//     if (respon) {
//       let request = {
//         userId: userId,
//         articleId: req.params.id,
//         comment: req.body.comment
//       };
//       Comments.update(request, {
//         where: { id: respon.id }
//       }).then(() => {
//         Comments.findOne({
//           attributes: ["id", "comment"],
//           include: [
//             {
//               model: Articles,
//               as: "articles",
//               attributes: ["id", "title"]
//             }
//           ],
//           where: { id: req.params.id }
//         }).then(response => {
//           res.send(response);
//         });
//       });
//     } else {
//       res.send({ message: "Not your Comment" });
//     }
//   });
// };
