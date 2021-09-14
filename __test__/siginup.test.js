
// 'use strict';

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Sequelize, DataTypes } = require('sequelize');
// const petsSchema = require('../src/models/pet');

// const sequelize = new Sequelize('postgres://postgres@localhost:5432/testing');

// const pets = petsSchema(sequelize, DataTypes);

// beforeAll(async () => {
//     await sequelize.sync();
// });

// afterAll( () => {
//      sequelize.drop();
// });

// describe('pets models', () => {
//     let userInfo = {
//         pet_name: 'cat',
//         pet_type: 'catt',
//         pet_age:'12',
//         user_id:'5'
//     }

//     it('add new pets', async () => {
       
//         let add = await pets.create(userInfo);
//         expect(201).toBe(201);
        
        
//     });
//     // it('find all pets',async()=>{

//     //   let findpet=awai
//     // })

    
// });