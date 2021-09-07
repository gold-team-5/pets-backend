'use strict';

const base64 = require('base-64');
const { userModel } = require('../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('Invalid Login') }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await userModel.authenticateBasic(user, pass)
    next();
  } catch (e) {
    next('Invalid Login')
  }

}