"use strict";

const { describe, beforeEach, afterEach } = require("@jest/globals");
const { userModel } = require("../src/models");

const {
  getAll,
  getAllAdmins,
  getSpecificUser,
  deleteUser,
} = require("../src/routs/admin");

describe("Logger MiddleWare", () => {
  let mockVar;
  let mockVarOne;
  let mockVardestroy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    mockVar = jest.spyOn(userModel, "findAll").mockImplementation();
    mockVarOne = jest.spyOn(userModel, "findOne").mockImplementation();
    mockVardestroy = jest.spyOn(userModel, "destroy").mockImplementation();
  });

  afterEach(() => {
    mockVar.mockRestore();
    mockVarOne.mockRestore();
  });

  it("GetAll", () => {
    getAll(req, res);

    expect(mockVar).toHaveBeenCalled();
  });

  it("GetAllAdmins", () => {
    getAllAdmins(req, res);

    expect(mockVar).toHaveBeenCalled();
  });
  it("GitOne", () => {
    req = {
      params: {
        id: 2,
      },
    };
    getSpecificUser(req, res);

    expect(mockVarOne).toHaveBeenCalled();
  });

  it("Delete", () => {
    req = {
      params: {
        id: 2,
      },
    };
    deleteUser(req, res);

    expect(mockVardestroy).toHaveBeenCalled();
  });
});
