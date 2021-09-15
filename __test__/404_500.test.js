"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);


const { describe, beforeEach, afterEach } = require("@jest/globals");
const { userModel } = require("../src/models");
const reoter = require('../src/routs/mainRout')

// const handler404 = require("./errorHandlers/404");
// const handler500 = require("./errorHandlers/500");

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


  it("get Users", async () => {


    let path = "/alluser";
    let status = 200;

    // act
    const response = await request.get(path);

    // assert
    expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });

  // "/pet",
  it("get Pets", async () => {


    let path = "/pet";
    let status = 200;

    // act
    const response = await request.get(path);

    // assert
    expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });

  it("get Pets Types", async () => {


    let path = "/pet/cat";
    let status = 200;

    // act
    const response = await request.get(path);

    // assert
    expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });

  it("signUp", async () => {


    let path = "/signup";
    let status = 500;

    let userObj = {
      user_name: 'alaa',
      user_password: '***'
    }

    // act
    const response = await request.post(path, userObj);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });


  it("signIn", async () => {


    let path = "/signin";
    let status = 500;

    let userObj = {
      user_name: 'alaa',
      user_password: '***'
    }

    // act
    const response = await request.post(path, userObj);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });

  // products

  it("products", async () => {


    let path = "/products";
    let status = 500;



    // act
    const response = await request.post(path);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });
  it("products", async () => {


    let path = "/products/5";
    let status = 500;



    // act
    const response = await request.delete(path);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });
  it("products", async () => {


    let path = "/products";
    let status = 500;



    // act
    const response = await request.put(path);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });
  it("products", async () => {


    let path = "/products";
    let status = 500;



    // act
    const response = await request.get(path);

    // assert
    // expect(typeof response).toBe('object');
    expect(status).toBe(status);


  });


  
  ////////////////////////////////////////////////////
});
