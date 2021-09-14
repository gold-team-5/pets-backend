"use strict";

const { describe, beforeEach, afterEach } = require("@jest/globals");
const { petModel } = require("../src/models");

const {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
} = require("../src/routs/adoption");

describe("Logger MiddleWare", () => {
  let mockVar;
  let mockVarOne;
  let mockVardestroy;
  let mockVaradd;

  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    mockVar = jest.spyOn(petModel, "findAll").mockImplementation();
    mockVarOne = jest.spyOn(petModel, "findOne").mockImplementation();
    mockVardestroy = jest.spyOn(petModel, "destroy").mockImplementation();

    mockVaradd = jest.spyOn(petModel, "create").mockImplementation();
  });

  afterEach(() => {
    mockVar.mockRestore();
    mockVarOne.mockRestore();
    mockVardestroy.mockRestore();
    mockVaradd.mockRestore();
  });

  it("GetAll", () => {
    getAllPet(req, res);

    expect(mockVar).toHaveBeenCalled();
  });

  it("Get One", () => {
    req = {
      params: {
        pet_type: "cat",
      },
    };

    getSpecificPet(req, res);

    expect(mockVar).toHaveBeenCalled();
  });

  it("Delete", () => {
    req = {
      params: {
        id: 2,
      },
    };
    deletePet(req, res);

    expect(mockVardestroy).toHaveBeenCalled();
  });

  it("Add One", () => {
    addPet(req, res);

    expect(mockVaradd).toHaveBeenCalled();
  });

  it("Update", () => {
    req = {
      params: {
        id: 2,
      },
      body: {},
    };

    updatePet(req, res);

    expect(mockVarOne).toHaveBeenCalled();
  });
});
