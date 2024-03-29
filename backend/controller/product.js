const Product = require('../model/product');

exports.addProduct = async (req, res, next) => {
  const { name, price, description, unit, weight, quantity, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Gambar Tidak valid' });
  }

  const newProduct = new Product({
    name,
    price,
    description,
    unit,
    quantity,
    weight,
    category,
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
  const searchQuery = req.query.search;
  const categoryQuery = req.query.category;
  let query = {};
  if (searchQuery) {
    query = { name: { $regex: searchQuery, $options: 'i' } };
  }

  if (categoryQuery) {
    query = { category: categoryQuery };
  }

  try {
    const products = await Product.find(query)
      .populate('category', '_id name')
      .sort({ updatedAt: -1 })
      .skip(page * itemPerPage)
      .limit(itemPerPage)
      .exec();
    if (!products) {
      return res.status(400).json({ success: false, message: 'Produk Tidak Ditemukan' });
    }

    const totalProducts = await Product.countDocuments(query).exec();
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
    const product = await Product.findOne({ _id: productId }).populate('unit');
    if (!product) {
      return res.status(400).json({ success: false, message: 'Produk Tidak Ditemukan' });
    }

    return res.status(200).json({ success: true, product });
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
        .json({ success: false, message: 'Tidak Dapat Menghapus Produk yang Tidak Ada' });
    }

    return res.status(200).json({ success: true, message: 'Produk Berhasil Dihapus' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, price, description, unit, weight, quantity, category, image } = req.body;

  const productId = req.params.id;

  const updatedProduct = {
    name,
    price,
    description,
    unit,
    weight,
    quantity,
    category,
    image: image || req.file.filename,
  };

  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: 'Tidak Dapat Mengupdate Produk yang Tidak Ada' });
    }

    return res.status(200).json({ success: true, message: 'Produk Berhasil diupdate' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
