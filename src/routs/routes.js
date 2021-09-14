"use strict";

const express = require("express");
const authRoutes = express.Router();

const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");
const basicAuth = require("../middleWare/basic");
//const signupCheck = require("../middleware/signupCheck");
const bearerAuth = require("../middleWare/bearer");
// const permissions = require("../middleware/acl.js");

authRoutes.post("/signup", async (req, res) => {
  try {
    let userRecord = await userModel.create(req.body);

    res.status(201).json(userRecord);
  } catch (e) {
    console.log(e.message, "................................");
    res.send(e.message);
  }
});

authRoutes.post("/signin", basicAuth(userModel), (req, res) => {
  const user = {
    id:req.resultData.id,
    user: req.resultData,
    token: req.resultData.token,
    capabilities: req.resultData.capabilities,
  };
  console.log(user);
  res.status(200).json(user);
});

module.exports = authRoutes;
