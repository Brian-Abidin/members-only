const mockUser = {
  user: "JohnWick",
  first_name: "John",
  last_name: "Wick",
  password: "IloveDog123",
  passwordConfirmation: "IloveDog123"
};

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
  // check the secret code
});
