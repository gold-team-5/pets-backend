"use strict";

const { userModel } = require("../models");

module.exports = async (req, res, next) => {
  let userRecord = await userModel.findOne({
    where: { user_name: req.body.user_name },
  });

  if (userRecord) {
    next("Username alerady exists");
  }

  try {
    req.user = await userModel.create(req.body);
    next();
  } catch (e) {
    next(e.message);
  }
};
