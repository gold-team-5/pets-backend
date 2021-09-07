"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin
const users = require("../models/index"); // Required table from Data Base //  Users

// Show Admins
async function getAll(req, res) {
  let allData = await admin.findall({});

  let adminNames = allData.map((names) => {
    return names.userName; //  Check user name from schema
  });
  res.status(200).json(adminNames);
}

// Show Users
async function getAllUsers(req, res) {
  let allData = await users.findall({});

  let userNames = allData.map((names) => {
    return names.userName; //  Check user name from schema
  });
  res.status(200).json(userNames);
}

// Show Specific User
async function getSpecificUser(req, res) {
  const id = req.params.id; //  Check the id

  let userData = await users.findOne({ where: { id } });

  res.status(200).json(userData);
}

// Delete
async function deleteUser(req, res) {
  const id = req.params.id; //  Check the id
  await users.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Deleted`);
}

module.exports = {
  getAll,
  getAllUsers,
  getSpecificUser,
  deleteUser,
};
