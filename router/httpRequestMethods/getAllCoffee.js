const getAllCoffee = async (req, res, collection) => {
   const cursor = collection.find({});
   const result = await cursor.toArray();
   res.send(result);
};

module.exports = getAllCoffee;
