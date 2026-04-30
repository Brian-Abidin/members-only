const expressSession = require("express-session");
const express = require("express");
const path = require("node:path");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(expressSession);
const usersRouter = require("./routes/usersRouter");
const passportController = require("./config/passport");
const errorController = require("./controller/errorController");
const pool = require("./db/pool");

require("dotenv").config();

const app = express();

const sessionStore = new pgSession({
  pool,
  tableName: "user_sessions"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// used to use static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// creating the express session and executing passport.session
// THIS IS FROM THE EXAMPLE IN ODIN PROJECT; UPDATE FOR INDIVIDUAL PROJECT
app.use(
  expressSession({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
  })
);
app.use(passport.session());

// used to parse form data into req.body
app.use(express.urlencoded({ extended: true }));
passport.use(passportController.localStratregy);

passport.serializeUser(passportController.serializeUser);
passport.deserializeUser(passportController.deserializeUser);

app.use(passportController.currentUser);

// uses usersRouter to route all views and display them in app
app.use("/", usersRouter);
app.use(errorController.get404);

module.exports = app;
