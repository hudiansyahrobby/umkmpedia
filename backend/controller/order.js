const Order = require('../model/order');
const Cart = require('../model/cart');

exports.getOrders = async (req, res, next) => {
  try {
    const userData = await Order.find({ userId: req.user._id });
    const order = userData;
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToOrder = async (req, res, next) => {
  try {
    const { products, totalPrice } = await Cart.findOne({ userId: req.user._id });
    const productData = products.map((product) => {
      return {
        productId: product.productId,
        name: product.name,
        quantity: product.quantity,
      };
    });

    const newOrder = new Order({
      userId: req.user._id,
      products: productData,
      totalPrice,
    });

    await newOrder.save();
    return res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
