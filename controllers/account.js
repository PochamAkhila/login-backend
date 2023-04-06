// const { findByIdAndDelete } = require("../models/account");
const LoginModel = require("../models/account");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenCreator = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

const forLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await LoginModel.signin(email, password);
    const token = tokenCreator(existingUser.id);
    res.status(200).json({ email, token });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const forSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await LoginModel.signup(email, password);
    const token = tokenCreator(existingUser.id);
    res.status(200).json({ email, token });
  }
   catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const createAccount = function (req, res, next) {
  const account = new LoginModel(req.body);
  account.save(function (err, data) {
    if (err) {
      return res.status(422).send(err);
    }
    return res.send(data);
  });
};

const getAccount = function (req, res, next) {
  // return res.send("products controller")
  if (req.params.id) {
    LoginModel.findById({ _id: req.params.id }, function (err, data) {
      return res.send(data);
    });
  } else {
    LoginModel.find({}, function (err, data) {
      return res.send(data);
    });
  }
};

let deleteUser = function (req, res, next) {
  let id = req.params.id;

  LoginModel.findByIdAndDelete(id, function (err, data) {
    if (err) {
      res.status(422).send(err);
    }
    res.send(data);
  });
};

let updateUser = function (req, res, next) {
  // let id = req.params.id;
  let id = _.get(req, "params.id", null);
  const body = _.get(req, "body", {});
  // let updateData = req.body
  // console.log(id);
  // console.log(updateData);

  LoginModel.findByIdAndUpdate(id, { $set: body }, function (err, data) {
    if (err) {
      res.status(422).send(err);
    }
    res.status(200).send({ message: "updated" });
  });
};

module.exports = {forSignup, forLogin, getAccount,  createAccount,  updateUser,  deleteUser};
