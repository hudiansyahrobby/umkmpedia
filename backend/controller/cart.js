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
  const { _id, name, price, image, unit } = product;

  const newProduct = {
    productId: _id,
    name,
    price,
    image,
    unit,
  };
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();

    if (cart) {
      // Find if the product exist in cart
      let itemIndex = cart.products.findIndex((product) => product.productId === id);

      if (itemIndex !== -1) {
        // Execute this if the product not found in cart
        let productItem = cart.products[itemIndex];
        productItem.quantity += 1;
        cart.products[itemIndex] = productItem;
      } else {
        // Execute this if the product not found in cart
        cart.products.push(newProduct);
      }
      // Count total price
      const totalPrice = cart.products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
      cart.totalPrice = totalPrice;
      await cart.save();
      return res.status(201).json({ success: true, cart: newProduct, totalPrice: cart.totalPrice });
    } else {
      const newCart = new Cart({
        userId: req.user._id,
        products: newProduct,
      });

      const totalPrice = newCart.products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
      newCart.totalPrice = totalPrice;
      const userCart = await newCart.save();

      return res
        .status(201)
        .json({ success: true, cart: userCart.products, totalPrice: userCart.totalPrice });
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

exports.increaseQuantity = async (req, res, next) => {
  const { id } = req.body;

  try {
    const userData = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();
    const cart = userData.products;
    const index = cart.findIndex(({ productId }) => {
      if (productId === id) return true;
    });
    cart[index].quantity += 1;
    const totalPrice = userData.products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    userData.totalPrice = totalPrice;

    await userData.save();
    return res.status(200).json({ success: true, cart: userData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.decreaseQuantity = async (req, res, next) => {
  const { id } = req.body;

  try {
    const userData = await Cart.findOne({ userId: req.user._id }).populate('cart').exec();
    let cart = userData.products;
    const index = userData.products.findIndex(({ productId }) => {
      if (productId === id) return true;
    });
    cart[index].quantity -= 1;

    let updatedCart;

    // Delete Item if the quantity is 0 or less
    if (cart[index].quantity <= 0) {
      updatedCart = cart.filter(({ productId }) => productId.toString() !== id.toString());
    } else {
      updatedCart = cart;
    }

    // Assign updated Cart to user cart
    userData.products = updatedCart;

    const totalPrice = userData.products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);

    userData.totalPrice = totalPrice;
    await userData.save();
    return res.status(200).json({ success: true, cart: userData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
