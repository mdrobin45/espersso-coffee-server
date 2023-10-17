const postOneCoffee = async (req, res, collection) => {
   const coffeeData = req.body;
   const result = await collection.insertOne(coffeeData);
   res.send(result);
};

module.exports = postOneCoffee;
