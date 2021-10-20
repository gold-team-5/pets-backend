const express = require("express");
const productsRouter = express.Router();

const {
  userModel,
  petModel,
  BookModel,
  productModel,
} = require("../models/index");
const bearerAuth = require("../middleWare/bearer");
const permissions = require("../middleWare/acl");

// get all products from user,admin
productsRouter.get(
  "/products",
 
  async (req, res) => {
    const products = await productModel.findAll({});
    const list = products.map((product) => {
      return {
        product_type: product.product_type,
        product_name: product.product_name,
        product_price: product.product_price,
      };
    });
    console.log(products)
    res.status(200).send(products);
  }
);
// get specific product user,admin
productsRouter.get(
  "/product/:id",
  bearerAuth(userModel),
  permissions("show"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let products = await productModel.findOne({ where: { id } });
    res.status(200).json(products);
  }
);
// add products from admin
productsRouter.post(
  "/product",
  bearerAuth(userModel),
  permissions("add"),
  async (req, res) => {
    const productInfo = req.body;
    let newProuduct = await productModel.create(productInfo);
    res.status(201).json(newProuduct);
  }
);
// update specific products from admin side
productsRouter.put(
  "/product/:id",
  bearerAuth(userModel),
  async (req, res) => {
    const id = parseInt(req.params.id);

    let newProuductInfo = req.body;
    let Product = await productModel.findOne({ where: { id } });
    let updateProduct = await Product.update(newProuductInfo);
  
    res.status(202).json(updateProduct);
  }
);
//delete specific products from admin side
productsRouter.delete(
  "/products/:id",
  bearerAuth(userModel),
  permissions("delete"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let deletedProduct = await productModel.destroy({ where: { id } });
    res.status(200).send(`--- Successfully  Deleted`);
  }
);
module.exports = productsRouter;
