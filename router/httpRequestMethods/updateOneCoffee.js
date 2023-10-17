const { ObjectId } = require("mongodb");

const updateOneCoffee = async (req, res, collection) => {
   const id = req.params.id;
   const newCoffeeData = req.body;
   const filter = { _id: new ObjectId(id) };
   const updateDoc = { $set: newCoffeeData };
   const result = await collection.updateOne(filter, updateDoc);
   res.send(result);
};

module.exports = updateOneCoffee;
