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
    res.status(500).send(e.message);
  }
});

authRoutes.post("/signin", basicAuth(userModel), (req, res) => {
  console.log(req.body)

  const user = {
    id:req.resultData.id,
    user: req.resultData,
    token: req.resultData.token,
    capabilities: req.resultData.capabilities,
    userphone:req.resultData.user_phone
  };
  console.log(user);
  res.status(200).json(user);
});

module.exports = authRoutes;
