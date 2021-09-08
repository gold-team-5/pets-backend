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

Relational Schema

 ![RelationalSchema](RelationalSchema.png)

context Diagram

![contextDigram](contextDigram.png)

# env file

DATABASE_URL=postgres://ozcckfki:fnVB2nqDZFNYG4AizPI1_QSxZ8Yv0Z7Y@chunee.db.elephantsql.com/ozcckfki