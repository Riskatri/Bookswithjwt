const db = require("../config/db.js");
const config = require("../config/config.js");
// const User = db.user;
// const Role = db.role;
const Book = db.book;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "book": {
      return [body("pages", "pages must be integer not a string").isInt()];
    }
  }
};

//get a book to database
exports.book = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      published_date: req.body.published_date,
      pages: req.body.pages,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    });
    res.status(201).send({
      status: "Book has been created!"
    });
  } catch (err) {
    return next(err);
  }
});

//menampilkan semua buku
exports.tampilbuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: [
      "title",
      "author",
      "published_date",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "All Book",
    book: book
  });
});

//mencari buku berdasarkan id
exports.findbookbyid = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id },
    attributes: [
      "title",
      "author",
      "published_date",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "Buku yang diinput",
    book: book
  });
});

exports.updateBook = asyncMiddleware(async (req, res) => {
  await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      published_date: req.published_date,
      pages: req.body.pages,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "Book has been update!"
  });
});

exports.deleteBook = asyncMiddleware(async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "book has been delete"
  });
});
