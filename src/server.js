"use strict";
const express = require("express");

const app = express();
app.use(express.json());

const router = require("./routs/mainRout");
app.use(router);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Server is up on port ${port} 👍`));
  },
};
