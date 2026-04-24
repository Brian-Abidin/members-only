describe("user", () => {
  decribe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should log the user in", () => {});
    });
    describe("given the password do not match", () => {
      it("should redirect the user to bad login page", () => {});
    });
  });

  describe("create user session", () => {
    describe("given username password are valid", () => {
      it("should log the user in and be visible in the req.user", () => {});
    });
  });
  // user registration
  // user and password are validated
  // verify that the passowrd must match
  // check the secret code
  // test creating a user session
  // a user can login with a valid user and password
});
