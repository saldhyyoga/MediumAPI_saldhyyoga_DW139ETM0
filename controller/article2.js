const jwt = require("jsonwebtoken");
const Model = require("../models");
const Article = Model.article;
const Category = Model.category;
const User = Model.user;

exports.list = (req, res) => {
  try {
    Article.findAll({
      attributes: {
        exclude: ["category_id", "is_published", "is_archived", "user_id"]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "is_active"]
          }
        }
      ],
      order: [["createdAt", "DESC"]]
    }).then(data => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: data
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: []
    });
  }
};

exports.detail = (req, res) => {
  try {
    Article.findAll({
      attributes: {
        exclude: ["category_id", "is_published", "is_archived", "user_id"]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "is_active"]
          }
        }
      ],
      where: {
        id: req.params.id
      },
      order: [["createdAt", "DESC"]]
    }).then(data => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: data
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: []
    });
  }
};

exports.latestArticleList = (req, res) => {
  try {
    Article.findAll({
      attributes: {
        exclude: ["category_id", "is_published", "is_archived", "user_id"]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "is_active"]
          }
        }
      ],
      where: {
        is_published: 1,
        is_archived: 0
      },
      order: [["createdAt", "DESC"]]
    }).then(data => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: data
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: []
    });
  }
};

exports.categoryWithArticleList = (req, res) => {
  try {
    Article.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt", "is_active"]
          }
        }
      ],
      where: {
        category_id: req.params.id
      }
    }).then(data => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: data
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: []
    });
  }
};

exports.PersonWithArticleList = (req, res) => {
  try {
    Article.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        }
      ],
      where: {
        user_id: req.params.id
      }
    }).then(data => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: data
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: []
    });
  }
};

exports.save = (req, res) => {
  let user_id = 0;
  let token = req.headers["authorization"];
  const {
    title,
    content,
    image,
    category_id,
    is_published,
    is_archived
  } = req.body;

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  jwt.verify(token, "siunix", (err, authData) => {
    if (err) {
      res.send({
        is_success: 0,
        message: "Token unauthorized!",
        data: {}
      });
    } else {
      user_id = getIdFromObject(authData);
    }
  });

  if (title.trim() === "")
    return res.send({
      is_success: 0,
      status: 200,
      message: "Can't empty title!",
      data: []
    });

  if (content.trim() === "")
    return res.send({
      is_success: 0,
      status: 200,
      message: "Can't empty content!",
      data: []
    });

  if (category_id === 0)
    return res.send({
      is_success: 0,
      status: 200,
      message: "Can't empty category!",
      data: []
    });

  if (user_id === 0)
    return res.send({
      is_success: 0,
      status: 200,
      message: "Can't empty user!",
      data: []
    });

  // User.findAll({
  //     where:{
  //         id: user_id
  //     }
  // }).then(data => {
  //     if(!data.length) {
  //         return (
  //             res.send({
  //                 is_success: 0,
  //                 status: 200,
  //                 message: "Can't empty user!",
  //                 data: []
  //             })
  //         )
  //     }
  // })

  try {
    Article.create({
      title: title,
      content: content,
      image: image,
      category_id: category_id,
      user_id: user_id,
      is_published: is_published,
      is_archived: is_archived
    }).then(article => {
      res.send({
        is_success: 1,
        status: 200,
        message: "Success!",
        data: article
      });
    });
  } catch (error) {
    res.send({
      is_success: 0,
      status: 500,
      message: "Failed! : " + error,
      data: {}
    });
  }
};

exports.update = (req, res) => {
  const { id } = req.params;

  Article.findAll({
    where: {
      id: id
    }
  })
    .then(data => {
      if (!data.length) {
        res.send({
          is_success: 0,
          status: 200,
          message: "Data not found!",
          data: []
        });
      } else {
        try {
          Article.update(req.body, {
            where: {
              id: id
            }
          }).then(data => {
            res.send({
              is_success: 1,
              status: 200,
              message: "Success!",
              data: data
            });
          });
        } catch (error) {
          res.send({
            is_success: 0,
            status: 500,
            message: "Failed!, " + error.message,
            data: []
          });
        }
      }
    })
    .catch(error => {
      res.send({
        is_success: 0,
        status: 500,
        message: "Failed!, " + error.message,
        data: []
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Article.findAll({
    where: {
      id: id
    }
  })
    .then(data => {
      if (!data.length) {
        res.send({
          is_success: 0,
          status: 200,
          message: "Data not found!",
          data: []
        });
      } else {
        try {
          Article.destroy({
            where: {
              id: id
            }
          }).then(data => {
            res.send({
              is_success: 1,
              status: 200,
              message: "Success!",
              data: data
            });
          });
        } catch (error) {
          res.send({
            is_success: 0,
            status: 500,
            message: "Failed!, " + error.message,
            data: []
          });
        }
      }
    })
    .catch(error => {
      res.send({
        is_success: 0,
        status: 500,
        message: "Failed!, " + error.message,
        data: []
      });
    });
};

function getIdFromObject(data) {
  let authData = JSON.stringify(data);
  authData = authData.split(",");
  user_id = authData[0].substring(10, data.length);
  return user_id;
}
