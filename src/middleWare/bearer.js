"use strict";

module.exports = (data) => (req, res, next) => {
  if (!req.headers.authorization) {
    console.error(`No authorization header found - jwt`);
    next("Invalid login");
    return;
  }

  // Basic lkahsdfklhsdf
  // Bearer lksahdflkjhdsaflkhasdlkfhj

  let token = req.headers.authorization.split(" ").pop();

  data
    .authenticateBearer(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next("Invalid login"));
};
