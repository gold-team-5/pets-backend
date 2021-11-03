"use strict";

localStorage.clear();

const logIn = document.getElementById("logInForm");

logIn.addEventListener("submit", logInFunction);

async function logInFunction(event) {
  event.preventDefault();

  let userPassword = event.target.userPassword.value;
  let userName = event.target.userName.value;

  console.log(`name = ${userName} + pass = ${userPassword}`);
  let userData = {
    user_name: userName,
    user_password: userPassword,
  };

  // let data = await axios.post('http://localhost:3000/pet',userData)
  // getData();
  // console.log(data);
  signInFunction(userName, userPassword);
}

async function getData() {
  let a = await axios.get("https://gold-team-mid-project.herokuapp.com/pet");
  console.log(a);
}

async function signInFunction(userName, userPassword) {

  // Send a GET request with the authorization header set to
  let uri = "https://gold-team-mid-project.herokuapp.com/signin";

  let h = new Headers();
  h.append(userName, userPassword);
  let encoded = window.btoa(`${userName}:${userPassword}`);
  let auth = "Basic " + encoded;
  h.append("Authorization", auth);
  // console.log(auth);

  let req = new Request(uri, {
    method: "POST",
    headers: h,
  });
  //credentials: 'same-origin'

  fetch(req)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        
        throw new Error("BAD HTTP stuff");
      }
    })
    .then((jsonData) => {
      console.log(jsonData);
      let storageData = JSON.stringify(jsonData);

      localStorage.setItem("userData", storageData);
      location.replace(
        "http://localhost:3008/userChatPage"
      );
    })
    .catch((err) => {
      console.log("ERROR:", err.message);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid userName or Password',
        footer: err.message,
      })
    });
}





let up = document.getElementById('signUpForm')

up.addEventListener('submit', signUp)

async function signUp(e){
  e.preventDefault();
//____userName

  let name = e.target.userName.value
  let pass = e.target.userPassword.value
  let phone = e.target.userPhone.value
  let address = e.target.userAddress.value
  let gender = e.target.userGender.value



////////////////////////////////
let uri = "https://gold-team-mid-project.herokuapp.com/signup";
let userOBJ = {
  user_name:name,
  user_password: pass,
  user_phone: phone,
  user_gender: gender,
  user_address: address

}
let newUser = await axios.post(uri,userOBJ ).then(data=>{
  console.log(data)
  Swal.fire(
    'Your Account Successfully Created 😊👌 ',
    `Welcome ${data.data.user_name}`,
    'success'
  )
}).catch((err) => {
  console.log("ERROR:", err.message);

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'This userName is alreday taken try another one 😭💔',
    footer: err.message,
  })
});
////////////////////////////////

  
}
