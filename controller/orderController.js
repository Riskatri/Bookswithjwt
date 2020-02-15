const db = require("../config/db.js");
const config = require("../config/config.js");
const Book = db.book;
const User = db.user;

const asyncMiddleware = require("express-async-handler");

exports.Order = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(books);
  res.status(201).send({
    user: user,
    books: books,
    status: "order success"
  });
});

//exports.user  ( id books, author, published_date, published_id,)
exports.users = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({});
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
    book: book,
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

//book
exports.bookContent = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
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
    description: "order sukses",
    user: user,
    book: book
  });
});
