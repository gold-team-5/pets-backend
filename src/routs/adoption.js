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
  console.log('jjjjjjjjjjjjjjjjj',req.body)
  try {
    let petRecord = await petModel.create(req.body);

    console.log("--------------------------------" + petRecord);

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

  res.status(202).json(upObj);
}

// take pet by admin
async function takePet(req, res) {
  const id = req.params.id; //  Check the id

  const petDta = await petModel.findOne({ where: { id } });

  if (petDta.pet_states == true) {
    // let obj = {
    //   pet_states: false,
    //   user_id: null,
    // };
    let obj = req.body;
    await petDta.update(obj);

    res.status(202).send(petDta);
  } else {
    res.status(400).send(" This pet has already been taken ⛔  ");
  }
}

// take pet by user
async function takePetUser(req, res) {
  // const id = req.params.id; //  Check the id

  res.status(202).json(`You should contact with admin 🐾`);
}

module.exports = {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
  takePet,
  takePetUser,
};
