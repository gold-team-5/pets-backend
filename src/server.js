'use strict';
const express = require('express');
const app = express();
app.use(express.json())

const authRoutes = require('./routes/routes');

app.use(authRoutes);
module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => console.log(`Server is up on port ${port} 👍`));
    }
}

// module.exports = {
//     server,
//     start: port => {
//         server.listen(port, () => console.log(`Server is up on port ${port}`));
//     }
// }