const express = require("express");
const cors = require("cors");
const router = require("./router/coffee");
const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// application router
app.get("/", (req, res) => {
   res.send("CoffeeServer is running");
});
app.use("/coffee", router);

// Server listen
app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});
