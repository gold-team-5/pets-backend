"use strict";

const express = require("express");
const router = express.Router();

const bearer = require("../middleWare/bearer");
const basic = require("../middleWare/basic");
const permissionsAccess = require("../middleWare/permissionsAccess");
const userBooking = require("../middleWare/userBooking");

const admin = require("../models/index"); // Required table from Data Base //  Admin
const userModel = require("../models/index");
const petModel = require("../models/index");
const BookModel = require("../models/index");

// import all function
const { getAll, getAllUsers, getSpecificUser, deleteUser } = require("./admin");
const {
  getAllPet,
  getSpecificPet,
  deletePet,
  addPet,
  updatePet,
} = require("./adoption");
const {
  getAllBooking,
  updateBook,
  deleteBook,
  updateBookUser,
} = require("./appointment");

///// admin //////

router.get("/admin", getAll); //  Show all admins
router.get("/users", bearer(userModel), getAllUsers);
router.get("/users/:id", bearer(userModel), getSpecificUser);
router.delete(
  "/users/:id",
  bearer(userModel),
  permissionsAccess("delete"),
  deleteUser
); //  check delete capabity in DB

//// adoption //////

router.get("/pet", getAllPet); // by user or admin
router.get("/pet/:type", getSpecificPet); // by user or admin

router.delete(
  "/pet/:id",
  bearer(admin),
  permissionsAccess("delete"),
  deletePet
); // by  admin // chek delete

router.put("/pet/:id", bearer(admin), permissionsAccess("update"), updatePet); // by  admin // chek update

router.post("/adapt", bearer(admin), permissionsAccess("add"), addPet); // by  admin // chek add

//// appointment //////

router.get("/appointment", getAllBooking); // by user or admin

router.put("/book/:id", bearer(userModel), updateBook); // just by user

router.delete(
  "/appointment/:id",
  bearer(admin),
  permissionsAccess("delete"),
  deleteBook
); //  by admin

router.put(
  "/delbook/:id",
  bearer(userModel),
  userBooking(BookModel),
  updateBookUser
); //  just by user // back to check userBooking !!

module.exports = router;
