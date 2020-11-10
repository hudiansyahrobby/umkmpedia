const Product = require('../model/product');

exports.addProduct = async (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image is not valid' });
  }

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    quantity,
    image: req.file.filename,
  });

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllProducts = async (req, res, next) => {
  const page = +req.query.page - 1 || 0;
  const itemPerPage = 8;
  try {
    const products = await Product.find({})
      .sort({ updatedAt: -1 })
      .skip(page * itemPerPage)
      .limit(itemPerPage)
      .exec();
    if (!products) {
      return res.status(400).json({ success: false, message: 'Products not found' });
    }
    const totalProducts = await Product.countDocuments({}).exec();
    const totalPage = Math.ceil(totalProducts / itemPerPage);
    return res.status(200).json({
      success: true,
      totalProducts: totalProducts,
      page: page + 1,
      pageSize: itemPerPage,
      totalPage: totalPage,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductByBrand = async (req, res, next) => {
  const brandId = req.params.id;
  try {
    const products = await Product.find({ brand: brandId });
    if (!products) {
      return res.status(400).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Can't delete product that doesn't exist" });
    }

    return res.status(200).json({ success: true, message: 'Product successfully deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, price, description, size, quantity } = req.body;

  const productId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image is not valid' });
  }

  // #TASK : DELETE IMAGE THAT IS NOT USER ANYMORE

  const updatedProduct = {
    name,
    price,
    description,
    size,
    quantity,
    image: req.file.path,
  };

  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Can't update product that doesn't exist" });
    }

    return res.status(200).json({ success: true, message: 'Product successfully updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProduct = async (req, res, next) => {
  const page = +req.query.page - 1 || 0;
  const itemPerPage = 8;
  try {
    const products = await Product.find({ name: { $regex: req.query.search, $options: 'i' } })
      .skip(page * itemPerPage)
      .limit(itemPerPage)
      .exec();
    if (!products) {
      return res.status(400).json({ success: false, message: 'Product not found' });
    }
    const totalProducts = await Product.countDocuments({
      name: { $regex: req.query.search, $options: 'i' },
    }).exec();
    const totalPage = Math.ceil(totalProducts / itemPerPage);
    return res.status(200).json({
      success: true,
      totalProducts: totalProducts,
      page: page + 1,
      pageSize: itemPerPage,
      totalPage: totalPage,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
