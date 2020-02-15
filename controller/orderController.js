const db = require("../config/db.js");
const config = require("../config/config.js");
const Book = db.book;
const User = db.user;

const asyncMiddleware = require("express-async-handler");

//get order
exports.Order = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const book = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(book);
  res.status(201).send({
    user: user,
    book: book,
    status: "order success"
  });
});

//show all order book
//exports.user  ( id books, author, published_date, published_id,)
exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "published_date",
          "pages",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    user: user,
    description: "All order book"
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "published_date",
          "pages",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Order book by ID",
    user: user
  });
});
