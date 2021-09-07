'use strict';
const express = require('express');
const app = express();
app.use(express.json())



app.use(express.json());





module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Server is up on port ${port} 👍`));
    }
}