"use strict";
module.exports = (capability) => {
  return (req, res, next) => {
    /// we should decode the jwt and get all the capabilities

    if (req.user.capabilities.includes(capability)) {
      next();
    } else {
      next("Access Denied");
    }
  };
};
