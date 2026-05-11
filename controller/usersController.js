const db = require("../db/queries");

// function that takes the array of author_ids
// from the messages db in PSQL and then makes
// an array of just usernames
async function getUsernamesByAuthorIds(idArr) {
  const promiseUsers = idArr.map((id) => db.getUserById(id));
  const resultUsers = await Promise.all(promiseUsers);
  return resultUsers.flat().map((user) => user.username);
}

async function getIndex(req, res) {
  const messages = await db.getAllMessages();
  const usernameArr = await getUsernamesByAuthorIds(
    messages.map((message) => message.author_id)
  );
  console.log(usernameArr, "THISSS");
  console.log(messages, "HERE");
  console.log(messages[0].id, "ALSO EHREE");
  console.log(res.locals);
  console.log(req.session, "SESSION");
  res.render("index", {
    usernameArr,
    messages,
    greeting: "hello world",
    user: req.user
  });
}

async function getForm(req, res) {
  res.render("sign-up-form");
}

async function getLogin(req, res) {
  res.render("log-in");
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
  getLogin,
  getMembersForm,
  getMessage,
  postMessage,
  postMembership
};
