"use strict";

const express = require("express");
const authRoutes = express.Router();

const {userModel}  = require("../models/index");
const basicAuth = require("../middleware/basic");
//const signupCheck = require("../middleware/signupCheck");
const bearerAuth = require("../middleware/bearer");
// const permissions = require("../middleware/acl.js");

authRoutes.post("/signup",async (req, res) => {
  try {
    let userRecord = await userModel.create(req.body);

    
    res.status(201).json(userRecord);
  } catch (e) {
    console.log(e.message,'................................');
 res.send(e.message);
  }
});

authRoutes.post("/signin", basicAuth(userModel), (req, res) => {
  const user = {
    user: req.user,
    token: req.user.token,
    capabilities:req.user.capabilities
  };
  console.log(user);
  res.status(200).json(user);
});



module.exports = authRoutes;
