const { body, validationResult } = require("express-validator");
require("dotenv").config();

const signUpValidation = [
  body("password").isLength({ min: 5 }),
  body("confirm-password").custom(
    (value, { req }) => value === req.body.password
  )
];

async function passwordConfirmation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("failure");
  }
  next();
}

const checkMemberCode = [
  body("secret-code").custom((value) => {
    if (value !== process.env.MEMBER_CODE) {
      throw new Error("Membership code is incorrect!");
    }
    return true;
  })
];

async function validateCode(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("failure");
  }
  next();
}

const checkAdminCode = [
  body("admin-code").custom((value) => {
    if (value !== process.env.ADMIN_CODE) {
      throw new Error("Admin code is incorrect.");
    }
    return true;
  })
];

module.exports = {
  signUpValidation,
  passwordConfirmation,
  checkMemberCode,
  checkAdminCode,
  validateCode
};
