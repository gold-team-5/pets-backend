"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin
const userModel = require("../models/index");
const petModel = require("../models/index");
const BookModel = require("../models/index");

// get

// Show all booking
async function getAllBooking(req, res) {
  let allData = await BookModel.findall({});

  res.status(200).json(allData);
}

// book

// update Specific book

async function updateBook(req, res) {
  const id = req.params.id; //  Check the id

  const bookDta = await BookModel.findOne({ where: { id } });

  if (bookDta.status == true) {
    let obj = bookDta;
    obj.status = false;

    await BookModel.update({ where: { id, obj } });

    res.status(202).json(`Booking done 😀`);
  } else {
    res
      .status(400)
      .send("This appointment has already been taken, try again 👽 ");
  }
}

// dele book by admin

// Delete Specific book by admin
async function deleteBook(req, res) {
  const id = req.params.id; //  Check the id

  await BookModel.destroy({ where: { id } });

  res.status(200).json(`id : ${id} --- Successfully Book Deleted`);
}

// delete book by user
async function updateBookUser(req, res) {
  const id = req.params.id; //  Check the id

  const bookDta = await BookModel.findOne({ where: { id } });

  if (bookDta.status == false) {
    let obj = bookDta;
    obj.status = true;

    await BookModel.update({ where: { id, obj } });

    res.status(202).json(`Booking done 😀`);
  } else {
    res.status(400).send(" You didn't pick this appointment yet ‼️ ");
  }
}

module.exports = {
  getAllBooking,
  updateBook,
  deleteBook,
  updateBookUser,
};
