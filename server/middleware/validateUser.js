const { body, validationResult } = require("express-validator");

const signUpValidation = [
  body("password").isLength({ min: 5 }),
  body("confirm-password").custom(
    (value, { req }) => value === req.body.password
  )
];

async function passwordConfirmation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors, "ERRORS");
    return res.render("failure");
  }
  next();
}

module.exports = {
  signUpValidation,
  passwordConfirmation
};
