"use strict";

module.exports = async (test) => {
  const booking = require("../models/index"); // Required table from Data Base //  booking

  const id = req.params.id; //  Check the id
  const bookDta = await booking.findOne({ where: { id } });

  return (req, res, next) => {
    if (bookDta.foreignKey == req.user.id) {
      next();
    } else {
      next("It's not your booking");
    }
  };
};
