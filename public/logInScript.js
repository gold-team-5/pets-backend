'use strict'



const logIn = document.getElementById('logInForm')

logIn.addEventListener('submit', logInFunction)

async function logInFunction(event) {
    event.preventDefault()

    let userPassword = event.target.userPassword.value
    let userName = event.target.userName.value

    console.log(`name = ${userName} + pass = ${userPassword}`)
    let userData = {
        user_name: userName,
        user_password: userPassword,

    }

    // let data = await axios.post('http://localhost:3000/pet',userData)
    // getData();
    // console.log(data);
    signInFunction(userName, userPassword)
}



async function getData() {
    let a = await axios.get('http://localhost:3000/pet')
    console.log(a)
}

async function signInFunction(userName, userPassword) {


    // Send a GET request with the authorization header set to
    let uri = "http://localhost:3000/signin";

    let h = new Headers();
    h.append(userName, userPassword);
    let encoded = window.btoa(`${userName}:${userPassword}`);
    let auth = 'Basic ' + encoded;
    h.append('Authorization', auth);
    // console.log(auth);

    let req = new Request(uri, {
        method: 'POST',
        headers: h
    });
    //credentials: 'same-origin'

    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('BAD HTTP stuff');
            }
        })
        .then((jsonData) => {
            console.log(jsonData);
            
        })
        .catch((err) => {
            console.log('ERROR:', err.message);
        });
}