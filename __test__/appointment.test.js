"use strict";

const { describe, beforeEach, afterEach } = require("@jest/globals");
const { BookModel } = require("../src/models");

const {
  getAllBooking,
  updateBook,
  deleteBook,
  updateBookUser,
  addBook,
} = require("../src/routs/appointment");

describe("Logger MiddleWare", () => {
  let mockVar;
  let mockVarOne;
  let mockVardestroy;
  let mockVaradd;

  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    mockVar = jest.spyOn(BookModel, "findAll").mockImplementation();
    mockVarOne = jest.spyOn(BookModel, "findOne").mockImplementation();
    mockVardestroy = jest.spyOn(BookModel, "destroy").mockImplementation();

    mockVaradd = jest.spyOn(BookModel, "create").mockImplementation();
  });

  afterEach(() => {
    mockVar.mockRestore();
    mockVarOne.mockRestore();
    mockVardestroy.mockRestore();
    mockVaradd.mockRestore();
  });

  it("GetAll", () => {
    getAllBooking(req, res);

    expect(mockVar).toHaveBeenCalled();
  });

  it("Delete", () => {
    req = {
      params: {
        id: 2,
      },
    };
    deleteBook(req, res);

    expect(mockVardestroy).toHaveBeenCalled();
  });

  it("Add One", () => {
    addBook(req, res);

    expect(mockVaradd).toHaveBeenCalled();
  });

  it("Update", () => {
    req = {
      params: {
        id: 2,
      },
    };

    updateBook(req, res);

    expect(mockVarOne).toHaveBeenCalled();
  });

  it("UpdateBookUser", () => {
    req = {
      params: {
        id: 2,
      },
    };

    updateBookUser(req, res);

    expect(mockVarOne).toHaveBeenCalled();
  });
});
