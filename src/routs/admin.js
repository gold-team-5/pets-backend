"use strict";

const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");

// Show Admins
async function getAll(req, res) {
  let allData = await userModel.findAll({});

  let userModelNames = allData.map((names) => {
    return ({name : names.user_name, id: names.id}); //  Check user name from schema
  });
  res.status(200).json(userModelNames);
}

// Show Users
async function getAllAdmins(req, res) {
  let allData = await userModel.findAll({ where: { user_role: "admin" } });

  let userNames = allData.map((names) => {
    return names.user_name; //  Check user name from schema
  });
  res.status(200).json(userNames);
}

// Show Specific User
async function getSpecificUser(req, res) {
  const id = req.params.id; //  Check the id

  let userData = await userModel.findOne({ where: { id } });

  res.status(200).json(userData);
}

// Delete
async function deleteUser(req, res) {
  const id = req.params.id; //  Check the id
  await userModel.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Deleted`);
}

module.exports = {
  getAll,
  getAllAdmins,
  getSpecificUser,
  deleteUser,
};
