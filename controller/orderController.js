const db = require("../config/db.js");
const config = require("../config/config.js");
const Book = db.book;
const User = db.user;

const asyncMiddleware = require("express-async-handler");

exports.order = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> Order Book ");
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: {
      id: req.paramas.id
    }
  });
  await user.setBooks(books);
  res.status(201).send({
    status: "Order successfully!"
  });
});

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
    description: "All order book",
    user: user
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
    description: "User Content Page",
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
    description: "User Content Page",
    user: user
  });
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
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
    description: "Admin Board",
    user: user
  });
});
exports.managementBoard = asyncMiddleware(async (req, res) => {
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
    description: "Management Board",
    user: user
  });
});
