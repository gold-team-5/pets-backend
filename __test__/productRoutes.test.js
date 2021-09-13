'use strict'
const { app } = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

describe ('prouduct api',()=>{
let obj={
    product_type: "drayfood",
        product_name: "kittenjello",
        product_price:"10"
}
// it ('shoud test prouducts rout',()=>{
  
//     const data = request.get("/products").send(obj);
//     expect(data.product_type).toEqual(obj.product_type);
//     expect(data.product_name).toEqual(obj.product_name);
//     expect(data.product_price).toEqual(obj.product_price);
// })
it("", async () => {
    // arrange
    let param = "/product/:id";
    let status = 200;
    // act
    const response = await request.get(param);

    // assert
    expect(response.status).toBe(status);
  });

});
