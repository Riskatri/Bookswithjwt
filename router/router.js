const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController");

module.exports = function(app) {
  // register dan login
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/login", authController.signin);

  // get all user
  app.post("/users", [authJwt.verifyToken], userController.users); // get 1 user according to roles
  app.get("/users", [authJwt.verifyToken], userController.users);

  //books
  app.post(
    "/books",
    [authJwt.verifyToken, authJwt.isAdmin],
    authController.book
  );
  //function(
  //   req,
  //   res,
  //   next
  // ) {
  //   const {
  //     title,
  //     author,
  //     published_date,
  //     pages,
  //     language,
  //     publisher_id
  //   } = req.body;
  //   model.book
  //     .create({
  //       title: title,
  //       author: author,
  //       published_date: published_date,
  //       pages: pages,
  //       language: language,
  //       publisher_id: publisher_id
  //     })
  //     .then(book =>
  //       res.status(201).json({
  //         error: false,
  //         data: book,
  //         message: "book has been created."
  //       })
  //     )
  //     .catch(error =>
  //       res.status(404).json({
  //         message: "just admin to created a book"
  //       })
  //     );
  // });

  app.get("/books", [authJwt.verifyToken], userController.users, function(
    req,
    res,
    next
  ) {
    model.Book.findAll({})
      .then(books =>
        res.status(201).json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.status(404).json({
          error: error,
          data: []
        })
      );
  });
  //get a book by Id
  app.get("/books:id", [authJwt.verifyToken], userController.users, function(
    req,
    res,
    next
  ) {
    model.Book.findAll(
      {},
      {
        where: { id: book_id }
      }
    )
      .then(books =>
        res.status(201).json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.status(404).json({
          error: error,
          data: []
        })
      );
  });

  //update book
  app.put("/books:id", [authJwt.verifyToken, authJwt.isAdmin], function(
    req,
    res,
    next
  ) {
    const book_id = req.params.id;
    const {
      title,
      author,
      published_date,
      page,
      language,
      publisher_id
    } = req.body;
    model.Book.update(
      {
        title: title,
        author: author,
        published_date: published_date,
        page: page,
        language: language,
        publisher_id: publisher_id
      },
      {
        where: {
          id: book_id
        }
      }
    )
      .then(book =>
        res.status(201).json({
          error: false,
          data: book,
          message: "book has been update."
        })
      )
      .catch(error =>
        res.status(404).json({
          message: "just admin to update a boook"
        })
      );
  });
  app.delete(
    "/books:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard,
    function(req, res, next) {
      const book_id = req.params.id;
      // const {title,author, published_date,page,language, publisher_id } = req.body;
      model.Book.destroy({
        where: {
          id: book_id
        }
      })
        .then(books =>
          res.status(201).json({
            error: false,
            data: books,
            message: "book has been delete."
          })
        )
        .catch(error =>
          res.status(404).json({
            message: "just admin to update a boook"
          })
        );
    }
  );

  //get orders
  app.post("/orders/:id", [authJwt.verifyToken], orderController.order);
  app.get("/orders", [authJwt.verifyToken], orderController.users);

  //   app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  //   app.get(
  //     "/api/test/pm",
  //     [authJwt.verifyToken, authJwt.isPmOrAdmin],
  //     userController.managementBoard
  //   );
  //   app.get(
  //     "/api/test/admin",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     userController.adminBoard
  //   );
  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
