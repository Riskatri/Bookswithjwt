const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");
const orderController = require("../controller/orderController");
const bookController = require("../controller/bookController");
const validController = require("../controller/validController");

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
    validController.checkValidationBook,
    bookController.validate("book"),
    bookController.book
  );

  app.get("/books", [authJwt.verifyToken], bookController.tampilbuku);
  app.get("/books/:id", [authJwt.verifyToken], bookController.findbookbyid);

  app.put(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.updateBook
  );
  app.delete(
    "/books/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    bookController.deleteBook
  );
  //order
  app.post("/orders/:id", [authJwt.verifyToken], orderController.Order);
  app.get("/orders", [authJwt.verifyToken], orderController.users);

  app.get("/orders/:id", [authJwt.verifyToken], orderController.userContent);
};
