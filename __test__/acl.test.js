"use strict";

const { describe, beforeEach, afterEach } = require("@jest/globals");

const { userModel } = require("../src/models/index");

const acl = require("../src/middleWare/acl");
const basic = require("../src/middleWare/basic");
const bearer = require("../src/middleWare/bearer");
const permissionsAccess = require("../src/middleWare/permissionsAccess");
const signupCheck = require("../src/middleWare/signupCheck");
const userBooking = require("../src/middleWare/userBooking");

describe("acl MiddleWare", () => {
  let mockVar;

  let mockRequest = {};
  let mockResponse = {};
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockVar = jest.spyOn(userModel, "findOne").mockImplementation();

    mockRequest = {};
    mockResponse = {};
    //   json: jest.fn(),
    // };
  });
  afterEach(() => {
    mockVar.mockRestore();
  });

  it("acl", async () => {
    await acl(mockRequest, mockResponse, nextFunction());

    expect(nextFunction).toHaveBeenCalled();
  });

  it("basic", async () => {
    await basic(mockRequest, mockResponse, nextFunction());

    expect(nextFunction).toHaveBeenCalled();
  });

  it("bearer", async () => {
    await bearer(mockRequest, mockResponse, nextFunction());

    expect(nextFunction).toHaveBeenCalled();
  });

  it("permissionsAccess", async () => {
    await permissionsAccess(mockRequest, mockResponse, nextFunction());

    expect(nextFunction).toHaveBeenCalled();
  });

  it("userBooking", async () => {
    await userBooking(mockRequest, mockResponse, nextFunction());

    expect(nextFunction).toHaveBeenCalled();
  });
});
