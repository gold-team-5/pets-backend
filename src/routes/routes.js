"use strict";

const express = require("express");
const authRoutes = express.Router();

const {userModel}  = require("../models");
const basicAuth = require("../middleware/basic");
const signupCheck = require("../middleware/signupCheck");
// const bearerAuth = require("../middleware/bearer");
// const permissions = require("../middleware/acl.js");

authRoutes.post("/signup", signupCheck,async (req, res, next) => {
  try {
    let userRecord = await userModel.create(req.body);

    const output = {
      user: userRecord

  
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRoutes.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});



module.exports = authRoutes;
