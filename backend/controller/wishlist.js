const Wishlist = require('../model/wishlist');
const Product = require('../model/product');
const { populate } = require('../model/wishlist');

exports.getProductInWishlist = async (req, res, next) => {
  try {
    const userData = await Wishlist.findOne({ userId: req.user._id })
      .populate('products.category', '_id name')
      .exec();
    if (!userData) {
      return res
        .status(200)
        .json({ success: false, message: 'Anda belum menambahkan barang favorit' });
    } else {
      const wishlist = userData.products;
      if (!wishlist) {
        return res
          .status(200)
          .json({ success: false, message: 'Anda belum menambahkan barang favorit' });
      }
      return res.status(200).json({ success: true, wishlist });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.addProductToWishlist = async (req, res, next) => {
  const { id } = req.body;

  const product = await Product.findOne({ _id: id }).populate('category', '_id name').exec();

  const { name, price, image, _id, category } = product;

  const newProduct = {
    productId: _id,
    name,
    price,
    image,
    category,
  };

  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate('wishlist').exec();

    if (wishlist) {
      // Find if the item in wishlist
      let itemIndex = wishlist.products.findIndex((product) => product.productId === id);

      if (itemIndex !== -1) {
        // execute this if item found in wishlist
        return res
          .status(400)
          .json({ success: false, message: 'Anda telah menambahkan Produk ini' });
      } else {
        // execute this if item not found in wishlist
        wishlist.products.push(newProduct);
        await wishlist.save();
        return res.status(201).json({ success: true, wishlist: newProduct });
      }
    } else {
      const newWishlist = new Wishlist({
        userId: req.user._id,
        products: newProduct,
      });

      await newWishlist.save();
      return res.status(201).json({ success: true, wishlist: newProduct });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProductFromWishlist = async (req, res, next) => {
  const productItemId = req.params.id;
  try {
    const userData = await Wishlist.findOne({ userId: req.user._id }).populate('wishlist').exec();
    const wishlist = userData.products;
    const updatedWishlist = wishlist.filter(
      (_wishlist) => _wishlist.productId.toString() !== productItemId.toString(),
    );
    userData.products = updatedWishlist;
    await userData.save();
    return res.status(200).json({ success: true, message: userData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
