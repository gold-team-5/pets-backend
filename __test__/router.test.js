// 'use strict';
// require("dotenv").config();
// const supertest = require('supertest');
// const { app } = require('../src/server');
// const request = supertest(app);
// const base64 = require('base-64');


// let obj = {
//     user_name: 'eman',
//     user_password: '1234',
//     user_address: "amman",
//     user_phone: "07909090"

// }


// describe('Auth Tests', () => {
//     let obj = {
//         user_name: 'eman',
//         user_password: 'eman1234'
//     }
// //     let obj2 = {
// //       product_name : 'food',
// //       product_type: 'fff',
// //       product_price:"30"

// //   }


//     it('sign up test  ', async () => {

//         const response = await request.post('/signup').send(obj); // async
//         expect(response.status).toEqual(200);


//     });

//     it('sign in test  ', async () => {


//         const response = await request.post('/signin')
//             .auth('eman', 'eman1234')
//         const userObject = response.body;
//         expect(response.status).toBe(200);
//         // expect(userObject.user).toBeDefined();
//         // expect(userObject.token).toBeDefined()


//     });
//     // it('  add product', async () => {
//     //   const response = await request.post('/product').send(obj2); // async
//     //   expect(response.status).toEqual(201);


    



// //   });








// });