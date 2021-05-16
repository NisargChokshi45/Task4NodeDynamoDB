const request = require("supertest");
const app = require("./../app");
const { errorFunction } = require("./../utils/errorFunction");

describe("Default Controller Testing", () => {
  test("should call default route", async () => {
    const body = errorFunction(false, "Welcome to AWS DynamoDB", "DynamoDB");
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(body);
  });
});
