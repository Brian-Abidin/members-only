const db = require("../db/queries");

async function getIndex(req, res) {
  console.log(res.locals);
  console.log(req.session, "SESSION");
  res.render("index", {
    greeting: "hello world",
    user: req.user
  });
}

async function getForm(req, res) {
  res.render("sign-up-form");
}

async function getMembersForm(req, res) {
  console.log(res.locals, "MEMBERS FORM");
  if (req.isAuthenticated()) {
    res.render("members-form", {
      member: res.locals.currentUser.is_member
    });
  } else {
    res.status(401).render("failure", {
      errors: new Error("user is not logged in")
    });
  }
}

function userPageVisitCount(req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }
  next();
}

async function postMembership(req, res) {
  db.updateMember(req.user.username);
  res.redirect("/");
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
  userPageVisitCount,
  getIndex,
  getFailure,
  getForm,
  getMembersForm,
  getMessage,
  postMessage,
  postMembership
};
