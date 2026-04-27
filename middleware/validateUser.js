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

async function validMemberCode(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("failure");
  }
  next();
}

module.exports = {
  signUpValidation,
  passwordConfirmation,
  checkMemberCode,
  validMemberCode
};
