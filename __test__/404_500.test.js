"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

describe("express server", () => {
  // (500)
  it("should check 500 errors", async () => {
    // arrange
    let path = "/bad";
    let status = 500;

    // act
    const response = await request.get(path);

    // assert
    expect(response.status).toBe(status);
    expect(typeof response.body).toEqual("object");
  });

  // (404)
  it("shoud check 404 errors", async () => {
    // arrange
    let path = "/notfound";
    let status = 404;
    // act
    const response = await request.get(path);
    // assert
    expect(response.status).toBe(status);
  });

  ////////////////////////////////////////////////////
});
