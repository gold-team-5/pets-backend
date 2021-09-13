"use strict";
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const authRoutes = require("./routs/routes");
const productRoute = require("./routs/productRoutes");
app.use(productRoute);
var http = require("http").Server(app);
var socketio = require("socket.io");
const router = require("./routs/mainRout");
app.use(router);
app.use(authRoutes);

// error

const handler404 = require("./errorHandlers/404");
const handler500 = require("./errorHandlers/500");
const { v4: uuidV4 } = require("uuid");
const uuid = require('uuid').v4;// random uuid
let queueMassage = {
  massage: {

  }
}



app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


//check if we need that
app.get('/student', (req, res) => {
  res.sendFile(__dirname + '/views/student.html')

})


app.get("/adminChatPage", (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.sendFile(__dirname + "/views/admin.html");
});

app.get("/userChatPage", (req, res) => {
  // res.redirect(`/${uuidV4()}`)
  res.sendFile(__dirname + "/views/user.html");
});

// 404 , 500
app.get("/bad", (req, res, next) => {
  next("error from (bad) end point");
});

app.use(handler500);

app.use("*", handler404);

//////////////////////////////////

//this is port 
let port = process.env.PORT;
// listen Function
const server = app.listen(port || 3000, () =>
  console.log(`Server is up on port ${port} 👍`)
);

//require database
const { db } = require("./models/index");

//chat functions

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.username = "Anonymous";

  //video function

  socket.on("join-room", (ROOM_ID, id) => {
    socket.join(ROOM_ID);
    socket.to(ROOM_ID).broadcast.emit("user-connected", id);

    socket.on("disconnect", () => {
      socket.to(ROOM_ID).broadcast.emit("user-disconnected", id);
    });
  });
  //change user name function

  socket.on("change_username", (data) => {
    socket.username = data.username;
  });


  //handle the new message event
  socket.on('new_message', data => {
    // console.log("new message")
    // io.sockets.emit('receive_message', { message: data.message, username: socket.username, id: data.id })


    let id = uuid()


    //add massge to queue 

    console.log("new message", data.message);
    io.sockets.emit("receive_message", {
      message: data.message,
      username: socket.username,
      id: data.id,
    });
    queueMassage.massage[id] = {
      message: data.message,
      username: socket.username,
      id: data.id,
    }

    console.log('queue massage after save', queueMassage.massage)
  });
  //get all massage from queue

  socket.on('getAll', (myID) => {  //  my
    Object.keys(queueMassage.massage).forEach(id => {
      console.log(queueMassage.massage[id].id)  //  reciver

      if(queueMassage.massage[id].id == myID){
        socket.emit('newmssg', { id, massage: queueMassage.massage[id] });
      }
      
    })
  });
  //delete massage from queue  after user recevied 
  socket.on('received', id => {
    delete queueMassage.massage[id];
    console.log('queue after del ', queueMassage.massage[id])
  });


  socket.on("change_username", (data) => {
    socket.username = data.username;
  });


});
//the port should be from the .evn file
db.sync()

  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(console.error);

// server.start(5002);

//
module.exports = {
  app: app,
}