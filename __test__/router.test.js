'use strict'

const supertest = require("supertest");
const server = require("../src/server").server;
const { db } = require("../src/models/index");
const mockRequest = supertest(server);

let users = {
    admin: { user_name: "admin", user_password: "password" },
   
    user: { user_name: "user", user_password: "password" }
  };
  
  beforeAll(async (done) => {
    await db.sync();
    done();
  });
  afterAll(async (done) => {
    await db.drop();
    done();
  });

  describe("Auth Router", () => {
    Object.keys(users).forEach((userType) => {
      describe(`${userType} users`, () => {
        it("creat new user", async (done) => {
          const response = await mockRequest
            .post("/signup")
            .send(users[userType]);
          const userObject = response.body;
  
          expect(response.status).toBe(201);
          expect(userObject.token).toBeDefined();
          expect(userObject.user.id).toBeDefined();
          expect(userObject.user.user_name).toEqual(users[userType].user_name);
          done();
        });
  
        // it("can signin with basic", async (done) => {
        //   const response = await mockRequest
        //     .post("/signin")
        //     .auth(users[userType].username, users[userType].password);
  
        //   const userObject = response.body;
        //   expect(response.status).toBe(200);
        //   expect(userObject.token).toBeDefined();
        //   expect(userObject.user.id).toBeDefined();
        //   expect(userObject.user.username).toEqual(users[userType].username);
        //   done();
        // });
  
        // it("can signin with bearer", async (done) => {
        //   // First, use basic to login to get a token
        //   const response = await mockRequest
        //     .post("/signin")
        //     .auth(users[userType].username, users[userType].password);
  
        //   const token = response.body.token;
  
        //   // First, use basic to login to get a token
        //   const bearerResponse = await mockRequest
        //     .get("/users")
        //     .set("Authorization", `Bearer ${token}`);
  
        //   // Not checking the value of the response, only that we "got in"
        //   expect(bearerResponse.status).toBe(200);
        //   done();
        // });
      });
  
    //   describe("bad logins", () => {
    //     it("basic fails with known user and wrong password ", async (done) => {
    //       const response = await mockRequest.post("/signin").auth("admin", "xyz");
    //       const userObject = response.body;
  
    //       expect(response.status).toBe(403);
    //       expect(userObject.user).not.toBeDefined();
    //       expect(userObject.token).not.toBeDefined();
    //       done();
    //     });
  
    //     it("basic fails with unknown user", async (done) => {
    //       const response = await mockRequest
    //         .post("/signin")
    //         .auth("nobody", "xyz");
    //       const userObject = response.body;
  
    //       expect(response.status).toBe(403);
    //       expect(userObject.user).not.toBeDefined();
    //       expect(userObject.token).not.toBeDefined();
    //       done();
    //     });
  
    //     it("bearer fails with an invalid token", async (done) => {
    //       // First, use basic to login to get a token
    //       const bearerResponse = await mockRequest
    //         .get("/users")
    //         .set("Authorization", `Bearer foobar`);
  
    //       // Not checking the value of the response, only that we "got in"
    //       expect(bearerResponse.status).toBe(403);
    //       done();
    //     });
    //   });
    });
    });
 

