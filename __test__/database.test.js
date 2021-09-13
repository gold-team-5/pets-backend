"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

// Postgres
// MySQL

const { describe, beforeAll, afterAll } = require("@jest/globals");
const userModel = require("../src/models/user");
const sequelize = new Sequelize(
  "postgres://ffgqxyhx:Ah1vctI8ocTRZBGSbTqsahuqVT5GLuyB@chunee.db.elephantsql.com/ffgqxyhx"
);
const Users = userModel(sequelize, DataTypes);
beforeAll(async () => {
  await sequelize.sync();
});
describe("Bearer Auth", () => {
  let userInfo = {
    user_name: "Test User",
    user_password: "123",
  };
  it("should create a user with a hashed password", async () => {
    // arrange
    // act
    let user = await Users.create(userInfo);
    let isValid = await bcrypt.compare(
      userInfo.user_password,
      user.user_password
    );
    // assert
    expect(user.id).toBeTruthy();
    //check user name and password
    expect(isValid).toBeTruthy();
  });
  it("should attach a teken on find", async () => {
    //arrange
    //act
    let user = await Users.findOne({
      where: { user_name: userInfo.user_name },
    });
    let decodedJwt = jwt.decode(user.token);
    // assert
    expect(user.user_name).toEqual(userInfo.user_name);
    expect(user.token).toBeTruthy();
    expect(decodedJwt.user_name).toEqual(userInfo.user_name);
  });
});

afterAll(() => {
  sequelize.drop();
});
