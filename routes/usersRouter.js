const { Router } = require("express");
const passport = require("passport");
const { validate } = require("jest-validate");
const usersController = require("../controller/usersController");
const passportController = require("../config/passport");
const validateMiddleware = require("../middleware/validateUser");

const UsersRouter = Router();

UsersRouter.get(
  "/",
  usersController.userPageVisitCount,
  usersController.getIndex
);
UsersRouter.get("/sign-up", usersController.getForm);
UsersRouter.get("/new", usersController.getMessage);
UsersRouter.get("/messages/:id", usersController.getMessageDetails);
UsersRouter.get("/members-form", usersController.getMembersForm);
UsersRouter.get("/admin-form", usersController.getAdminForm);
UsersRouter.get("/failure", usersController.getFailure);
UsersRouter.get("/log-out", passportController.logoutRequest);
UsersRouter.get("/log-in", usersController.getLogin);
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
UsersRouter.post(
  "/members-form",
  validateMiddleware.checkMemberCode,
  validateMiddleware.validateCode,
  usersController.postMembership
);
UsersRouter.post(
  "/admin-form",
  validateMiddleware.checkAdminCode,
  validateMiddleware.validateCode,
  usersController.postAdmin
);
UsersRouter.post("/delete", usersController.postDeleteMessage);

module.exports = UsersRouter;
