const Cart = require('../model/cart');
const Product = require('../model/product');

exports.getProductInCart = async (req, res, next) => {
  try {
    const userData = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();
    const cart = userData;
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.addProductToCart = async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.findOne({ _id: id });
  const { _id, name, price, image, unit, quantity: stock, weight, category } = product;

  const newProduct = {
    productId: _id,
    name,
    price,
    image,
    unit,
    weight,
    category,
    stock,
  };
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();

    if (cart) {
      // Find if the product exist in cart
      let itemIndex = cart.products.findIndex((product) => product.productId === id);

      if (itemIndex !== -1) {
        return res
          .status(400)
          .json({ success: false, message: 'Item Telah Ditambahkan Pada Keranjang' });
      } else {
        // Execute this if the product not found in cart
        cart.products.push(newProduct);
      }

      await cart.save();
      return res.status(201).json({ success: true, cart: newProduct });
    } else {
      const newCart = new Cart({
        userId: req.user._id,
        products: newProduct,
      });

      const userCart = await newCart.save();

      return res.status(201).json({ success: true, cart: userCart.products });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProductFromCart = async (req, res, next) => {
  const productItemId = req.params.id;
  try {
    const userData = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();
    const cart = userData.products;
    const updatedCart = cart.filter((_cart) => _cart._id.toString() !== productItemId.toString());
    userData.products = updatedCart;
    const totalPrice = userData.products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    userData.totalPrice = totalPrice;
    await userData.save();
    return res.status(200).json({ success: true, message: 'Item successfully delete from cart' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.changeQuantity = async (req, res, next) => {
  const { id, quantity } = req.body;
  console.log(id);
  console.log('quntity', quantity);
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    const cart = userCart.products;
    const index = cart.findIndex(({ _id }) => _id.toString() === id.toString());
    console.log('INDEX', index);
    console.log('cart', cart);
    cart[index].quantity = +quantity;
    await userCart.save();
    return res.status(200).json({ success: true, cart: userCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
