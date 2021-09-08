"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin
const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");

// Show all pet
async function getAllPet(req, res) {
  let allData = await petModel.findAll({});

  res.status(200).json(allData);
}

// Show Specific pet
async function getSpecificPet(req, res) {
  const pet_type = req.params.pet_type;

  let petData = await petModel.findAll({ where: { pet_type } });

  res.status(200).json(petData);
}

// Delete Specific pet
async function deletePet(req, res) {
  const id = req.params.id;
  await petModel.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Deleted`);
}

// add pet
async function addPet(req, res) {
  try {
    let petRecord = await petModel.create(req.body);

    res.status(201).json(petRecord);
  } catch (e) {
    console.log(e.message, "................................");
    res.send(e.message);
  }
}

// update Specific pet
async function updatePet(req, res) {
  const id = req.params.id;
  const obj = req.body;

  let upObj = await petModel.findOne({ where: { id } });

  await upObj.update(obj);

  res.status(202).json(`id : ${id} --- Successfully Update`);
}

module.exports = {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
};
