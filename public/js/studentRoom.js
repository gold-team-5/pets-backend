(function connect() {
    let socket = io.connect()

    let username = document.querySelector('#username')
    let usernameBtn = document.querySelector('#usernameBtn')
    let curUsername = document.querySelector('.card-header')
    function getRandomInt(max) {
        let a=Math.floor(Math.random() * max);
       return a
     }
    let queueMassage={
        massage:{

        }
    }
   
    usernameBtn.addEventListener('click', e => {
        console.log(username.value)
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value
        username.value = ''
    })


    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')

    messageBtn.addEventListener('click', e => {
        console.log('iiiiiiiiiiiii',message.value)
        socket.emit('new_message', { message: message.value, type: 'student' })
        
        let id = getRandomInt(10000)
        queueMassage.massage[id]=message.value;
        console.log('queue massage after save', queueMassage.massage)
        message.value = ''
        
    })
   
    socket.on('getAll', () => {
        Object.keys(queueMassage.massage).forEach(id => {
            socket.emit('newmssg', { id, massage: queueMassage.massage[id]  });
        })
    });

    socket.on('receive_message', data => {
 
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)

    })




    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    // socket.on('typing', data => {

    //     info.textContent = data.username + " is typing..." + data.text
    //     setTimeout(() => { info.textContent = '' }, 5000)
    // })



    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username })
    })

})()