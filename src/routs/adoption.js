"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin
const users = require("../models/index"); // Required table from Data Base //  Users
const pet = require("../models/index"); // Required table from Data Base //  pet

// Show all pet
async function getAllPet(req, res) {
  let allData = await pet.findall({});

  res.status(200).json(allData);
}

// Show Specific pet
async function getSpecificPet(req, res) {
  const type = req.params.type; //  Check the type

  let petData = await pet.findall({ where: { type } });

  res.status(200).json(petData);
}

// Delete Specific pet
async function deletePet(req, res) {
  const id = req.params.id; //  Check the id
  await pet.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Deleted`);
}

// add pet
async function addPet(req, res) {
  pet
    .create(req.body)
    .then((newPet) => res.status(201).send(newPet))
    .catch((err) => res.status(400).send(err));
}

// update Specific pet
async function updatePet(req, res) {
  const id = req.params.id; //  Check the id
  const obj = req.body;
  await pet.update({ where: { id, obj } });

  res.status(202).json(`id : ${id} --- Successfully Update`);
}

module.exports = {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
};
