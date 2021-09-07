'use strict';

const server = require('./src/server');

const { db } = require('./src/models/index');
//the port should be from the .evn file
db.sync()
    .then(() => {
        server.start(3000);
    })
    .catch(console.error);
 
// server.start(5002);