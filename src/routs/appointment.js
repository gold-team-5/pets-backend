"use strict";

const admin = require("../models/index"); // Required table from Data Base //  Admin

const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");

// get

// Show all booking
async function getAllBooking(req, res) {
  let allData = await BookModel.findAll({});

  res.status(200).json(allData);
}

// book

// update Specific book

async function updateBook(req, res) {
  const id = req.params.id; //  Check the id

  const bookDta = await BookModel.findOne({ where: { id } });

  if (bookDta.book_states == true) {
    let obj = req.body;

    await bookDta.update(obj);

    res.status(202).send(bookDta);
  } else {
    res
      .status(400)
      .send("This appointment has already been taken, try again 👽 ");
  }
}

//cancel book from user 
async function cancelBook(req, res) {
  const id = req.params.id; //  Check the id

  const bookDta = await BookModel.findOne({ where: { id } });

  if (bookDta.book_states == false) {
    let obj = req.body;

    await bookDta.update(obj);

    res.status(202).send(bookDta);
  } else {
    res
      // .status(400)
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

  if (bookDta.book_states == false) {
    let obj = {
      book_states: true,
      user_id: null,
    };

    await bookDta.update(obj);

    res.status(202).json(`Booking Cancelled ❌`);
  } else {
    res.status(400).send(" You didn't pick this appointment yet ‼️ ");
  }
}

// add book
async function addBook(req, res) {
  
  try {
   
    let BookRecord = await BookModel.create(req.body);

    res.status(201).json(BookRecord);
  } catch (e) {
    console.log(e.message, ".>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..");
    res.send(e.message);
  }
}

//
//

module.exports = {
  getAllBooking,
  updateBook,
  deleteBook,
  updateBookUser,
  addBook,
  cancelBook
};
