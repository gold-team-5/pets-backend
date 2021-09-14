'use strict';

const base64 = require('base-64');

module.exports = (data) => (req, res, next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
        next('Invalid login');
        return;
    }
    // basic ajkldsfhlkdsjfds
    const encodedCredintials = req.headers.authorization.split(' ').pop();
    //username:password
    const [username, password] = base64.decode(encodedCredintials).split(':');

    data.authenticateBasic(username, password)
        .then((user) => {
            req.resultData = user;
            next();
        })
        .catch((err) => next('Invalid login'));
}