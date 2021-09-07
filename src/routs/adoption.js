"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin
const userModel = require("../models/index");
const petModel = require("../models/index");

// Show all pet
async function getAllPet(req, res) {
  let allData = await petModel.findall({});

  res.status(200).json(allData);
}

// Show Specific pet
async function getSpecificPet(req, res) {
  const type = req.params.type; //  Check the type

  let petData = await petModel.findall({ where: { type } });

  res.status(200).json(petData);
}

// Delete Specific pet
async function deletePet(req, res) {
  const id = req.params.id; //  Check the id
  await petModel.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Deleted`);
}

// add pet
async function addPet(req, res) {
  petModel
    .create(req.body)
    .then((newPet) => res.status(201).send(newPet))
    .catch((err) => res.status(400).send(err));
}

// update Specific pet
async function updatePet(req, res) {
  const id = req.params.id; //  Check the id
  const obj = req.body;
  await petModel.update({ where: { id, obj } });

  res.status(202).json(`id : ${id} --- Successfully Update`);
}

module.exports = {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
};
