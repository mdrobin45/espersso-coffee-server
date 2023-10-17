const { ObjectId } = require("mongodb");

const deleteOneCoffee = async (req, res, collection) => {
   const id = req.params.id;
   const query = { _id: new ObjectId(id) };
   const result = await collection.deleteOne(query);
   res.send(result);
};

module.exports = deleteOneCoffee;
