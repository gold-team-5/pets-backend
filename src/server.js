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

//
const handler404 = require("./errorHandlers/404");
const handler500 = require("./errorHandlers/500");
//

// ++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++

var http = require("http").Server(app);

var socketio = require("socket.io");

// var app = require('express')();
// var io = require('socket.io');

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/*
app.get('/student', (req, res) => {

res.sendFile(__dirname + '/views/student.ejs')

  
})

*/


app.get('/adminChatPage', (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.sendFile(__dirname + '/views/admin.html')


})

app.get('/userChatPage', (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.sendFile(__dirname + '/views/user.html')
})

  // 404 , 500
  app.get("/bad", (req, res, next) => {
    next("error from (bad) end point");
  });

  app.use(handler500);

  app.use("*", handler404);

  //////////////////////////////////

  // const server = app.listen(process.env.PORT || 4212, () => {
  //   console.log("server is running")
  // })

  // ++++++++++++++++++++++++++++++++++++
  // ++++++++++++++++++++++++++++++++++++

  require("dotenv").config();

  // const server = require('http').Server(app)

  const { v4: uuidV4 } = require("uuid");

  let port = process.env.PORT
  const server = app.listen(port||3000, () => console.log(`Server is up on port ${port} 👍`));

  // server.start(3000);
  const { db } = require("./models/index");
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


    socket.on("change_username", (data) => {
      socket.username = data.username;
    });


    socket.on('typing', data => {
      socket.broadcast.emit('typing', { username: socket.username, text: data.text })
    })

  })
  //the port should be from the .evn file
  db.sync()

    .then(() => {


      console.log("DataBase Connected");



    }).catch(console.error);

// server.start(5002);

module.exports = {
  app: app,
};
