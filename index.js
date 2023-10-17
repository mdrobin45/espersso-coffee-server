const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const getAllCoffee = require("./router/httpRequestMethods/getAllCoffee");
const getOneCoffee = require("./router/httpRequestMethods/getOneCoffee");
const postOneCoffee = require("./router/httpRequestMethods/postOneCoffee");
const updateOneCoffee = require("./router/httpRequestMethods/updateOneCoffee");
const deleteOneCoffee = require("./router/httpRequestMethods/deleteOneCoffee");
const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cloud uri
const uri = `mongodb+srv://coffee-shop:iBTCWd03PNorpC6o@cluster0.ywsqr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const run = async () => {
   const databaseName = client.db("espresso-coffee");
   const collection = databaseName.collection("Coffee");
   app.get("/", (req, res) => {
      res.send("CoffeeServer is running");
   });

   // Get all coffee
   app.get("/all", (req, res) => {
      getAllCoffee(req, res, collection);
   });

   // Get a coffee
   app.get("/:id", (req, res) => {
      getOneCoffee(req, res, collection);
   });

   // Post a coffee
   app.post("/new", (req, res) => {
      postOneCoffee(req, res, collection);
   });

   // Update a coffee
   app.put("/update/:id", (req, res) => {
      updateOneCoffee(req, res, collection);
   });

   // Delete a coffee
   app.delete("/delete/:id", (req, res) => {
      deleteOneCoffee(req, res, collection);
   });

   await client.connect((err) => {
      if (err) {
         console.log(err);
         return false;
      }

      // Server listen
      app.listen(port, () => {
         console.log(`Server is running on ${port}`);
      });
   });
};
run();
