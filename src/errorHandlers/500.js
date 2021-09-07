"use strict";

module.exports = (err, req, res, next) => {
    let da = res.status(500).send({
        error: 500,
        massage: `we have error :anger: ${err} `,
    });
};