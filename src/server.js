'use strict';

const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

const http = require('http'); //package or module 
const server = http.createServer(app);
const io = require('socket.io')(server);





//=================================================

const path = require('path'); //node js core module to read    public file?







// Set static folder//i want public folder to set as static folder to access html pages (chat.html,index.html)

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/index.html')

})


const botName = 'Chat-App';
//=================================================



app.use(express.urlencoded({ extended: true }));


//=================================================
io.on('connection', socket => {
  console.log('new WS connection');
  
})
const start=(port)=>{
  server.listen(port,()=>console.log(`listening to port :  ${port}` ));
};

module.exports={
  start:start,
  server:server,
};