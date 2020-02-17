const db = require("../config/db.js");
const config = require("../config/config.js");
// const ROLEs = config.ROLEs;
// const User = db.user;

const Book = db.book;
// app.use(express.json());
// const { check, validationResult } = require("express-validator");

checkValidationBook = (req, res, next) => {
  // -> Check if book already added
  Book.findOne({
    where: {
      title: req.body.title
    }
  }).then(book => {
    if (book) {
      res.status(400).send("Fail -> book is already added!");
      return;
    }
    next();
  });
};
const validControllerVerify = {};
validControllerVerify.checkValidationBook = checkValidationBook;
module.exports = validControllerVerify;
