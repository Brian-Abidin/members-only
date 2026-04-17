const { body } = require("express-validator");
const db = require("../db/queries");

async function getIndex(req, res) {
  console.log(res.locals);
  res.render("index", {
    greeting: "hello world",
    user: req.user
  });
}

function passwordConfirmation() {
  body("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  });
}

async function getForm(req, res) {
  res.render("sign-up-form");
}

async function getMembersForm(req, res) {
  console.log(req.isAuthenticated(), "MEMBERS FORM");
  if (req.isAuthenticated()) {
    res.render("members-form");
  } else {
    res.render("failure", {
      errors: new Error("user is not logged in")
    });
  }
}

async function getFailure(req, res) {
  res.render("failure");
}

async function getMessage(req, res) {
  console.log(req.isAuthenticated(), "GET MESSAGE");
  if (req.isAuthenticated()) {
    res.render("message");
  } else {
    res.render("failure", {
      errors: new Error("user is not logged in")
    });
  }
}

async function postMessage(req, res) {
  console.log(req.user, "POSTED");
  const { title } = req.body;
  const message = req.body.message.replace(/\r?\n|\r/g, " ");
  if (req.isAuthenticated()) {
    await db.insertMessage(req.user.username, title, message);
  }
  res.redirect("/");
}

module.exports = {
  getIndex,
  passwordConfirmation,
  getFailure,
  getForm,
  getMembersForm,
  getMessage,
  postMessage
};
