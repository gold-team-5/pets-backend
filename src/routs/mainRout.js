"use strict";

const express = require("express");
const router = express.Router();

const bearer = require("../middleWare/bearer");
const basic = require("../middleWare/basic");
const permissionsAccess = require("../middleWare/permissionsAccess");
const userBooking = require("../middleWare/userBooking");

const admin = require("../models/index"); // Required table from Data Base //  Admin

const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");
console.log(userModel)
// import all function
const {
  getAll,
  getAllAdmins,
  getSpecificUser,
  deleteUser,
} = require("./admin");
const {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
  takePet,
  takePetUser,
} = require("./adoption");
const {
  getAllBooking,
  updateBook,
  deleteBook,
  updateBookUser,
  addBook,
  cancelBook
} = require("./appointment");

///// admin //////

//
router.get("/alluser", getAll); // get all user + admin
router.get("/admins", bearer(userModel), getAllAdmins); // get all  admin
//
// router.get("/admin", getAll);
// router.get("/users", bearer(userModel), getAllAdmins);
router.get("/alluser/:id", bearer(userModel), getSpecificUser);
router.delete(
  "/alluser/:id",
  bearer(userModel),
  permissionsAccess("delete"),
  deleteUser
); //  check delete capabity in DB

//// adoption //////

router.get("/pet", getAllPet);
router.get("/pet/:pet_type", getSpecificPet); // by user or admin

router.delete(
  "/pet/:id",
  bearer(userModel),
  permissionsAccess("delete"),
  deletePet
); // by  admin

router.put(
  "/pet/:id",
  bearer(userModel),
  permissionsAccess("update"),
  updatePet
); // by  admin // chek update

//////////////////////////////////
router.put(
  "/adoptionpet/:id",
  bearer(userModel),
  permissionsAccess("update"),
  takePet
); // take Pet by admin
////////////////////////////////
router.put(
  "/adoptionpetUser/:id",
  bearer(userModel),
  permissionsAccess("show"),
  takePetUser
); // take Pet by user
///////////////////////////////

router.post("/adapt", bearer(userModel), permissionsAccess("add"), addPet); // by  admin // chek add

//// appointment //////

router.get("/appointment", getAllBooking); // by user or admin

router.put("/book/:id", bearer(userModel), updateBook); // just by book appointment
router.put("/bookfromuser/:id", bearer(userModel), cancelBook); // just by user to cancel appiontment

router.delete(
  "/appointment/:id",
  bearer(userModel),
  permissionsAccess("delete"),
  deleteBook
); //  by admin

router.put(
  "/delbook/:id",
   bearer(userModel),
  userBooking(BookModel),
  updateBookUser
); //  just by user // back to check userBooking !!

router.post(
  "/newAppointment",
   bearer(userModel),
   permissionsAccess("add"),
  addBook
); // by user or admin

module.exports = router;
