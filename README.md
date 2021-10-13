# pets-backend

## siginin/siginup Routs

| method      |                      link           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    post     |  signup/                            | sigin up for user       |
|   post      |   signin/                           |     sigin in for user    |


## products Routs


| method      |                    link   |   Description                        |
| ----------- | --------------------------|--------------------------------------|
|    GET      |  product/                |    get all products from user,admin  |
|    GET      |  product:id              |    get specific product user,admin   |
|   post      | product/                 |    add products from admin           |
|    delete   |  product/:id             |   delete products from admin         |
|   put       |product/:id               |  update specific products            |



## user Rout

| method      |                      link           |   Description              |
| ----------- | ------------------------------------|----------------------------|
|    GET      |  user/                              |    get all user from admin |
|    GET      |  user/:id                           |get specific  user from admin|
|    delete   |  user/:id                           |      delete user from admin|


## adaptation Routs 


| method      |                      link           |   Description             |
| ----------- | ------------------------------------|--------------------------|
|    GET      |  pet/                                | get all pet from user,admin |
|    GET      |  pet/:id                         |  get specific  pet from user, admin  |
|    delete   |      pet/:id       |      delete pet from admin|
| put         | pet/:id            |update specific pet from admin|
|post         |adapt | adapt pet drom user must siginin and Submit a request to the admin|


## appointment Rout

| method      |                      link           |   Description             |
| ----------- | ------------------------------------|--------------------------|
|  GET |      appointment/       | get all available appointment from user &admin |
|  post |      newAppointment/       | book appointment from user  &admin |
|  delete  |      book/:id       | delete  appointment from user  &admin |
|  put  |      book/:id       | update  appointment from user  &admin |



 ER diagram

 ![ERdiagram](ERdiagram.png)




 ![RelationalSchema](RelationalSchema.png)

# env file

DATABASE_URL=postgres://ozcckfki:fnVB2nqDZFNYG4AizPI1_QSxZ8Yv0Z7Y@chunee.db.elephantsql.com/ozcckfki

## Software Requirements

## Vision

Problem Domain
The main idea for our website is to adopt pets
provide services including medical services, and purchase all pet supplies

and the user can book an apointment to treate his bets and the server will  
checks if the appointment is booked or available

The user was able to talk with the admin to agree on the adoption procedures

### What pain point does this project solve?

- Shorten the time to find a pet for adoption

- Find a place that provides all the services the user needs to take care of his pet

- The possibility of seeing the pet and previewing it through the camera available to the user upon adoption

- Providing medical services for pets

### Why should we care about your product?

Providing everything the user needs in the field of pets in a reliable place and in the least time and effort

### Scope (In/Out)

### IN - What will your product do

- The web app will provide information to the users about all the bets avalible for adobtion

- The web app will provide medical services for pets

- Users will be able to seeing the pet and previewing it through the camera available to the user upon adoption

- provide services including medical services, and purchase all pet supplies

### OUT - What will your product not do

- My website will never turn into an IOS or Android app
- The quality of animals is limited because the store is unable to import from abroad, as it is a local project

### What are your stretch goals?

Dealing with animal rights organizations and expanding the adoption system in our store

### capabilities

```
    admin: ["update", "delete", "add", "show"],
    user: ["show"],
    doctor: ["show"],

```

### Data Flow


 RelationalSchema

![RelationalSchema](RelationalSchema.png)

 ER diagram

 ![diagram](image.png)

 context Diagram

![contextDigram](contextDigram.png)

### Non-Functional Requirements

1. Security:basic ,barer, auth
2. Usability:express,midlleware (404,500)
3. Testability:jest supertest
