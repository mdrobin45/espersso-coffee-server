const express = require("express");
const { MongoClient } = require("mongodb");
const getAllCoffee = require("./httpRequestMethods/getAllCoffee");
const getOneCoffee = require("./httpRequestMethods/getOneCoffee");
const postOneCoffee = require("./httpRequestMethods/postOneCoffee");
const deleteOneCoffee = require("./httpRequestMethods/deleteOneCoffee");
const updateOneCoffee = require("./httpRequestMethods/updateOneCoffee");
const router = express.Router();

// Cloud uri
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ywsqr.mongodb.net/?retryWrites=true&w=majority`;

// Local uri
const uri =
   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3";

const client = new MongoClient(mongoUri);

const connect = async () => {
   // Make connection with mongo Cluster
   try {
      // await client.connect();
      console.log("Database connection successful!");
   } catch (error) {
      console.error("Cannot establish database connection: ", error);
   }

   // Create database and collection
   const databaseName = client.db("espresso-coffee");
   const collection = databaseName.collection("Coffee");

   // Get all coffee
   router.get("/all", (req, res) => {
      getAllCoffee(req, res, collection);
   });

   // Get a coffee
   router.get("/:id", (req, res) => {
      getOneCoffee(req, res, collection);
   });

   // Post a coffee
   router.post("/new", (req, res) => {
      postOneCoffee(req, res, collection);
   });

   // Update a coffee
   router.put("/update/:id", (req, res) => {
      updateOneCoffee(req, res, collection);
   });

   // Delete a coffee
   router.delete("/delete/:id", (req, res) => {
      deleteOneCoffee(req, res, collection);
   });
};

// Run main function
connect();

// Export module
module.exports = router;
