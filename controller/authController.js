const db = require("../config/db.js");
const config = require("../config/config.js");
const User = db.user;
const Role = db.role;
const Book = db.book;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.validate = method => {
  switch (method) {
    case "signup": {
      return [
        body("email", "harus dalam bentuk mail").isEmail(),
        body("password", "password minimal 6").isLength({ min: 6 })
      ];
    }
  }
};

exports.signup = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }

    // Save User to Database
    //signup
    console.log("Processing func -> SignUp");
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles
        }
      }
    });
    await user.setRoles(roles);
  } catch (err) {
    return next(err);
  }
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: req.body.email,
    from: "secretadmirer@example.com",
    subject: "Sending Verify Your account",
    text: "thankyou for register",
    html: "<strong>thankyou for register, enjoy with your code</strong>"
  };
  sgMail.send(msg);

  res.status(201).send({
    status: "User registered successfully!"
  });
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Not Found!"
    });
  }
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  }
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token
  });
});
