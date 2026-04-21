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
UsersRouter.get("/membership", usersController.getMembersForm);
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
  validateMiddleware.signUpValidation,
  validateMiddleware.passwordConfirmation,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/failure"
  })
);
UsersRouter.post("/message", usersController.postMessage);

module.exports = UsersRouter;
