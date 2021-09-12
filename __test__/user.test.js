'use strict';

 let SECRET = "goldteam";

const supertest = require('supertest');
const {app} = require('../src/server');
const { db } = require('../src/models/index');

const mockRequest = supertest(app);


let users = {
    user_name:"wijdan",
      user_password:"789456",

      user_phone: "078",
      user_address:"amman",
      user_gender:"femal",
      user_role:"admin"
};

beforeAll(async () => {
  await db.sync();
  
});



describe('Auth Router', () => {



    describe(` users`, () => {

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users);
        const userObject = response.body;

        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.user_name).toEqual(users.user_name)
        
      });

    //   it('can signin with basic', async () => {

    //     const response = await mockRequest.post('/signin')
    //       .auth(users[userType].user_name, users[userType].user_password);

    //     const userObject = response.body;
    //     expect(response.status).toBe(200);
    //     expect(userObject.token).toBeDefined();
    //     expect(userObject.user.id).toBeDefined();
    //     expect(userObject.user.user_name).toEqual(users[userType].user_name)
        
    //   });

    //   it('can signin with bearer', async () => {

    //     // First, use basic to login to get a token
    //     const response = await mockRequest.post('/signin')
    //       .auth(users[userType].username, users[userType].password);

    //     const token = response.body.token;

    //     // First, use basic to login to get a token
    //     const bearerResponse = await mockRequest
    //       .get('/getCurrentUser')
    //       .set('Authorization', `Bearer ${token}`)

    //     // Not checking the value of the response, only that we "got in"
    //     expect(bearerResponse.status).toBe(200);
        
    //   });

    });

   



});

// describe('bad logins', () => {
//     it('basic fails with known user and wrong password ', async () => {

//       const response = await mockRequest.post('/signin')
//         .auth('admin', 'xyz')
//       const userObject = response.body;

//       expect(response.status).toBe(403);
//       expect(userObject.user).not.toBeDefined();
//       expect(userObject.token).not.toBeDefined();
     
//     });

//     it('basic fails with unknown user', async () => {

//       const response = await mockRequest.post('/signin')
//         .auth('nobody', 'xyz')
//       const userObject = response.body;

//       expect(response.status).toBe(403);
//       expect(userObject.user).not.toBeDefined();
//       expect(userObject.token).not.toBeDefined()
      
//     });

//     it('bearer fails with an invalid token', async () => {

//       // First, use basic to login to get a token
//       const bearerResponse = await mockRequest
//         .get('/getCurrentUser')
//         .set('Authorization', `Bearer foobar`)

//       // Not checking the value of the response, only that we "got in"
//       expect(bearerResponse.status).toBe(500);
      
//     })
//   })