const {Product} = require('../../Model/DB_structure')
const {productFilter} = require('./constant/productFilter')
const searchProduct = async(req,res) => {
    const queryParameters = req.query;
  const productParameters = ['price', 'description', 'location'];

  try {
    const results = await Promise.all(productParameters.map(async (param) => {
      const searchField = param;
      const searchValue = queryParameters[param];

      // Perform a search in your collection based on the dynamic field and value
      const searchResult = await Product.find({ [searchField]: searchValue }).exec();
      const populatedSearchResult = await Product.populate(searchResult, { path: 'Farmer' });
      const ModifiedResult = productFilter(populatedSearchResult)
      return  ModifiedResult;
    }));

    res.json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = {searchProduct}