require("express-group-routes");
// require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

// controllers
const CategoryController = require("./controller/category");
const ArticleController = require("./controller/article");
const auth = require("./controller/auth");
const authMiddleware = require("./middleware/middleware");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.group("/api/v1", router => {
  // router.post("/login", auth.login);
  router.post("/register", auth.register);
  router.post("/login", auth.login);

  // routes category
  router.get("/categories", CategoryController.index);
  router.get("/category/:id", CategoryController.show);
  router.get("/category/:id/article", CategoryController.detail);
  router.post("/category", CategoryController.store);

  // router articles
  router.get("/articles", ArticleController.list);
  router.get("/articles/popular", ArticleController.popular);
  router.post("/article", authMiddleware.auth, ArticleController.store);
  router.get("/article/:id", ArticleController.detail);
  router.patch("/article/:id", authMiddleware.auth, ArticleController.update);
  router.delete("/article/:id", authMiddleware.auth, ArticleController.delete);
  // router comments
  router.post(
    "/article/:id/comment",
    authMiddleware.auth,
    ArticleController.addcomment
  );
  router.get(
    "/article/:id/comments",
    authMiddleware.auth,
    ArticleController.showcomments
  );
  router.delete(
    "/article/:id/comment",
    authMiddleware.auth,
    ArticleController.deletecomment
  );
  router.patch(
    "/article/:id/comment",
    authMiddleware.auth,
    ArticleController.updatecomment
  );

  // router article by user
  router.get(
    "/user/:id/articles",
    authMiddleware.auth,
    ArticleController.showArticlesByUser
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
