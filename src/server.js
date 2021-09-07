
'use strict';
const express = require('express');
const app = express();
app.use(express.json())

const authRoutes = require('./routes/routes');
const productRoute=require('./routes/productRoutes')
app.use( productRoute)

const router = require("./routs/mainRout");
app.use(router);

app.use(authRoutes);
module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Server is up on port ${port} 👍`));
    }
}


