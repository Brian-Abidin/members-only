const { body, validationResult } = require("express-validator");
const { Router } = require("express");
const passport = require("passport");
const usersController = require("../controller/usersController");
const passportController = require("../config/passport");
const validateMiddleware = require("../middleware/validateUser");

const UsersRouter = Router();

UsersRouter.get("/", usersController.getIndex);
UsersRouter.get("/sign-up", usersController.getForm);
UsersRouter.get("/message", usersController.getMessage);
UsersRouter.get("/members-form", usersController.getMembersForm);
UsersRouter.get("/failure", usersController.getFailure);
UsersRouter.get("/log-out", passportController.logoutRequest);
UsersRouter.post(
  "/sign-up",
  validateMiddleware.signUpValidation,
  validateMiddleware.passwordConfirmation,
  passportController.createUser
);
UsersRouter.post(
  "/log-in",
  body("password").isLength({ min: 5 }),
  body("confirm-password").custom(
    (value, { req }) => value === req.body.password
  ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors, "ERRORS");
      return res.render("failure");
    }
    next();
  },
  (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (user) {
        // If the user exists log him in:
        req.login(user, (error) => {
          if (error) {
            res.send(error);
          } else {
            console.log("Successfully authenticated");
            // HANDLE SUCCESSFUL LOGIN
            res.redirect("/");
          }
        });
      } else {
        console.log(info.message, "HERE!"); // Prints the reason of the failure
        // HANDLE FAILURE LOGGING IN
        res.redirect("/failure");
      }
    })(req, res);
  }
);
UsersRouter.post("/message", usersController.postMessage);

module.exports = UsersRouter;
