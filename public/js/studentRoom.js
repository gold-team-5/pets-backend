
(function connect() {
    let socket = io.connect()

    

    let username = document.querySelector('#username')
    let userID = document.querySelector('#userID')
    let usernameBtn = document.querySelector('#usernameBtn')
    let curUsername = document.querySelector('.card-header')



    usernameBtn.addEventListener('click', changeName)
    function changeName(e) {
        console.log(username.value)
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value
        username.value = ''
    }

    //  local storage
    const userStorageData = localStorage.getItem('userData');
    const userStorageDataFromJSON = JSON.parse(userStorageData)
    console.log(userStorageDataFromJSON.user)
    username.value = userStorageDataFromJSON.user.user_name
    let myID = userStorageDataFromJSON.user.id
    changeName()

    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')

    messageBtn.addEventListener('click', e => {
        let id = userID.value

        

        console.log(message.value)
        socket.emit('new_message', { message: message.value, id: id })
        message.value = ''
        console.log(id);
        console.log(myID);

        console.log(typeof id);
        console.log(typeof myID);

    })

    socket.on('receive_message', data => {
        if (myID == data.id ) {
            console.log(data)
            let listItem = document.createElement('li')
            listItem.textContent = data.username + ': ' + data.message
            listItem.classList.add('list-group-item')
            messageList.appendChild(listItem)
        }


    })




    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    // socket.on('typing', data => {

    //     info.textContent = data.username + " is typing..." + data.text
    //     setTimeout(() => { info.textContent = '' }, 5000)
    // })



})()