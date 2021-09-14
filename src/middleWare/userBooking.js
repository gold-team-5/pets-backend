"use strict";

module.exports = (booking) => {
  // console.log("5555555");
  return async (req, res, next) => {
    const id = req.params.id; //  Check the id
    const bookDta = await booking.findOne({ where: { id } });

    if (bookDta.user_id == req.user.id) {
      next();
    } else {
      next("It's not your booking");
    }
  };
};
