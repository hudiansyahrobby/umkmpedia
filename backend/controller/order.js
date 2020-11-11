const Order = require('../model/order');
const Cart = require('../model/cart');
const request = require('request');

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

exports.getProvince = (req, res, next) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: { key: process.env.RAJA_ONGKIR_API_KEY },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      return res.status(201).json({ success: true, provinces: result.rajaongkir.results });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCity = (req, res, next) => {
  const provinceId = req.params.id;
  try {
    const options = {
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/city',
      qs: { province: provinceId },
      headers: { key: process.env.RAJA_ONGKIR_API_KEY },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      return res.status(201).json({ success: true, cities: result.rajaongkir.results });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCost = (req, res, next) => {
  const { origin, destination, weight, courier } = req.body;
  try {
    const options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {
        key: process.env.RAJA_ONGKIR_API_KEY,
        'content-type': 'application/x-www-form-urlencoded',
      },
      form: { origin, destination, weight, courier },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const result = JSON.parse(body);
      return res.status(201).json({ success: true, cost: result });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
