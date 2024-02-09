const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {}
  if(!req.query.admin){
      condition.deleted = {$ne:true}
  }
  console.log(req.query)
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: {$in:req.query.category.split(',')} });
    totalProductsQuery = totalProductsQuery.find({
      category: {$in:req.query.category.split(',')} 
    });
  }

  if (req.query.brand) {
    query = query.find({ brand:{$in:req.query.brand.split(',')}  });
    totalProductsQuery = totalProductsQuery.find({ brand:{$in:req.query.brand.split(',')}  });
  }

  if (req.query.title_like) {
    const titleRegex = new RegExp(req.query.title_like, 'i');
      query = query.find({ title: { $regex: titleRegex } });
      totalProductsQuery = totalProductsQuery.find({ title: { $regex: titleRegex } });

  }

  // Price Range Filter
  if (req.query.price_gte && req.query.price_lte) {
    query = query.find({
      price: { $gte: parseFloat(req.query.price_gte), $lte: parseFloat(req.query.price_lte) },
    });
    totalProductsQuery = totalProductsQuery.find({
      price: { $gte: parseFloat(req.query.price_gte), $lte: parseFloat(req.query.price_lte) },
    });
  }

  // Rating Range Filter
  if (req.query.rating_gte && req.query.rating_lte) {
    query = query.find({
      rating: { $gte: parseFloat(req.query.rating_gte), $lte: parseFloat(req.query.rating_lte) },
    });
    totalProductsQuery = totalProductsQuery.find({
      rating: { $gte: parseFloat(req.query.rating_gte), $lte: parseFloat(req.query.rating_lte) },
    });
  }

  // Sort
  if (req.query._sort && req.query._order) {
    const sortObject = {};
    sortObject[req.query._sort] = req.query._order;
    query = query.sort(sortObject);
  }

  const totalDocs = await totalProductsQuery.countDocuments().exec();

  // Pagination
  if (req.query._page && req.query._limit) {
    const pageSize = parseInt(req.query._limit);
    const page = parseInt(req.query._page);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
