const uuidv4 = require('uuid').v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('disconnect', () => this.disconnect());

      socket.on('new_message', data => {
    console.log("new message")
    io.sockets.emit('receive_message', { message: data.message, username: socket.username, id: data.id })


//     let id = uuid()


//     //add massge to queue 

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

//     console.log('queue massage after save', queueMassage.massage)
  });
//   //get all massage from queue

  socket.on('getAll', (myID) => {  //  my
    Object.keys(queueMassage.massage).forEach(id => {
      console.log(queueMassage.massage[id].id)  //  reciver

      if (queueMassage.massage[id].id == myID) {
        socket.emit('newmssg', { id, massage: queueMassage.massage[id] });
      }

    })
  });
  //delete massage from queue  after user recevied 
  socket.on('received', id => {
    delete queueMassage.massage[id];
    console.log('queue after del ', queueMassage.massage[id])
  });


    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  sendMessage(message) {
      this.io.sockets.emit('message', message);
  }
  
  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: value.useName || defaultUser,
      value:value.value,
      time: Date.now()
    };

    messages.add(message);
    this.sendMessage(message);

    setTimeout(
      () => {
        messages.delete(message);
        this.io.sockets.emit('deleteMessage', message.id);
      },
      messageExpirationTimeMS,
    );
  }

  disconnect() {
    users.delete(this.socket);
  }
}

function chat(io) {
  io.on('connection', (socket) => {
      console.log('---------------------s');
    new Connection(io, socket);   
  });
};

module.exports = chat;