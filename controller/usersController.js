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
  if (res.locals.currentUser) {
    res.render("index", {
      member: res.locals.currentUser.is_member,
      usernameArr,
      messages,
      greeting: "hello world",
      user: req.user
    });
  } else {
    res.render("index", {
      usernameArr,
      messages,
      greeting: "hello world",
      user: req.user
    });
  }
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
      admin: res.locals.currentUser.is_admin,
      member: res.locals.currentUser.is_member,
      user: req.user
    });
  } else {
    res.status(401).render("failure", {
      errors: new Error("user is not logged in")
    });
  }
}

async function getAdminForm(req, res) {
  if (req.isAuthenticated() && res.locals.currentUser.is_member) {
    res.render("adminForm", {
      admin: res.locals.currentUser.is_admin,
      member: res.locals.currentUser.is_member,
      user: req.user
    });
  } else {
    res.status(401).render("failure", {
      errors: new Error("user is not authorized to access this page")
    });
  }
}

async function postAdmin(req, res) {
  db.updateAdmin(req.user.username);
  res.redirect("/");
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
    res.render("messageForm", {
      member: res.locals.currentUser.is_member,
      user: req.user
    });
  } else {
    res.render("failure", {
      errors: new Error("user is not logged in")
    });
  }
}

async function getMessageDetails(req, res) {
  // obtain pramaters, id, from URL
  const { id } = req.params;
  const messages = await db.getAllMessages();
  // id is not a number, put + in front of variable turns it into a number
  const foundMessage = messages.find((message) => message.id === +id);
  if (foundMessage) {
    const author = await db.getUserById(foundMessage.author_id);
    res.render("messages", {
      id,
      user: req.user,
      member: res.locals.currentUser.is_member,
      foundMessage,
      author: author[0].username
    });
  } else {
    res.render("failure", {
      errors: new Error("message does not exist")
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

async function postDeleteMessage(req, res) {
  const { message_id } = req.body;
  await db.deleteMessageById(message_id);
  res.redirect("/");
}

module.exports = {
  userPageVisitCount,
  getIndex,
  getFailure,
  getForm,
  getLogin,
  getMembersForm,
  getAdminForm,
  getMessage,
  getMessageDetails,
  postMessage,
  postMembership,
  postAdmin,
  postDeleteMessage
};
