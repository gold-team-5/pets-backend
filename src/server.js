// "use strict";
const express = require("express");
const app = express();
app.use(express.json());

const authRoutes = require("./routs/routes");
const productRoute = require("./routs/productRoutes");
app.use(productRoute);

const router = require("./routs/mainRout");
app.use(router);

app.use(authRoutes);

// ++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++ 

var http = require('http').Server(app);

var socketio = require('socket.io')


// var app = require('express')();
// var io = require('socket.io');


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/index.html')

})

 
//check if we need that
app.get('/student', (req, res) => {
res.sendFile(__dirname + '/views/student.html')
  
})


// app.get('/student', (req, res) => {

//   res.sendFile(__dirname + '/views/student.html')


// })

// const server = app.listen(process.env.PORT || 4212, () => {
//   console.log("server is running")
// })

// ++++++++++++++++++++++++++++++++++++ 
// ++++++++++++++++++++++++++++++++++++ 

require('dotenv').config();





// const server = require('http').Server(app)

const { v4: uuidV4 } = require('uuid')

let port = 3000

// server.start(3000);
const { db } = require("./models/index");
//the port should be from the .evn file
db.sync()

  .then(() => {
    const server = app.listen(port, () => console.log(`Server is up on port ${port} 👍`));

    const io = socketio(server)

    io.on('connection', socket => {
      console.log("New user connected")

      socket.username = "Anonymous"

      socket.on('join-room', (ROOM_ID, id) => {
        socket.join(ROOM_ID)
        socket.to(ROOM_ID).broadcast.emit('user-connected', id)

        socket.on('disconnect', () => {
          socket.to(ROOM_ID).broadcast.emit('user-disconnected', id)
        })
      })

      socket.on('change_username', data => {
        socket.username = data.username
      })


      //handle the new message event
      socket.on('new_message', data => {
        console.log("new message")
        io.sockets.emit('receive_message', { message: data.message, username: socket.username, type: data.type })
      })


      socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username, text: data.text })
      })

    })


  })
  .catch(console.error);

// server.start(5002);
module.exports={
  app:app
}