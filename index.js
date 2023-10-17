const express = require("express");
const cors = require("cors");
const router = require("./router/coffee");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();

// Cloud uri
const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ywsqr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(mongoUri);

// Middleware
app.use(cors());
app.use(express.json());

// application router
app.get("/", (req, res) => {
   res.send("CoffeeServer is running");
});
app.use("/coffee", router);

client.connect((err) => {
   if (err) {
      console.log(err);
      return false;
   }

   // Server listen
   app.listen(port, () => {
      console.log(`Server is running on ${port}`);
   });
});
