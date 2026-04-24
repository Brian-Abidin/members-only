// test all function that are used to render the page
const request = require("supertest");
const handlers = require("../handlers");
const app = require("../app");

describe("routes", () => {
  describe("GET /", () => {
    it("should return 200 status and return to the home page", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.text).toMatchSnapshot();
    });
  });
  describe("GET unknown route", () => {
    it("should return 404 for an unknown route", async () => {
      const response = await request(app).get("/fakeroute");

      expect(response.statusCode).toBe(404);
    });
  });
});
