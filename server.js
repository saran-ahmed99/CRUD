const express = require("express");
const mongoose = require("mongoose");

//models
const Product = require("./models/productModel");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//route

//get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find any product with id ${id}` });
    }

    const updatedData = await Product.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res
        .status(404)
        .json({ message: `Cannot find any product with id ${id}` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:Sabree8647@cluster0.io6m987.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
