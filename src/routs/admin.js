'use strict';

const Router = require('express').Router

const bearer = require('../middleWare/bearer')
const basic = require('../middleWare/basic')
const permissionsAccess = require('../middleWare/permissionsAccess')

const admin = require('../models/index') // Required table from Data Base //  Admin
const users = require('../models/index') // Required table from Data Base //  Users


// Show Admins
async function getAll(req, res) {
    let allData = await admin.findall({})


    let adminNames = allData.map((names) => {
        return (names.userName)  //  Check user name from schema 
    })
    res.status(200).json(adminNames)
}



// Show Users
async function getAllUsers(req, res) {
    let allData = await users.findall({})


    let userNames = allData.map((names) => {
        return (names.userName)  //  Check user name from schema 
    })
    res.status(200).json(userNames)
}

// Show Specific User
async function getSpecificUser(req, res) {
    const id = req.params.id //  Check the id 

    let userData = await users.findOne({where: {id}})


    
    res.status(200).json(userData)
}

// Delete
async function deleteUser(req, res) {
    const id = req.params.id //  Check the id 
    await users.destroy({ where: { id } });
    
    res.status(200).json(`id : ${id} --- Successfully Deleted`)
}



Router.get('/admin', getAll)  //  Show all admins 
Router.get('/users',bearer(users), getAllUsers)
Router.get('/users/:id',bearer(users), getSpecificUser)
Router.delete('/users/:id',bearer(users),permissionsAccess('delete'), deleteUser)  //  check delete capabity in DB


module.exports = Router