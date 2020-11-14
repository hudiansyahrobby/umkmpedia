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

exports.getCost = async (req, res, next) => {
  const { destination, courier } = req.body;
  // const { products, totalPrice } = await Cart.findOne({ userId: req.user._id });
  const weight = 800;
  // Origin Mataram
  const origin = 276;
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
      return res.status(201).json({ success: true, courier: result.rajaongkir.results });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.postPayment = async (req, res, next) => {
  console.log('POSTPAYMENT');
  try {
    var options = {
      method: 'POST',
      url: 'https://my.ipaymu.com/api/v2/payment/direct',
      headers: {
        'Content-Type': 'application/json',
        signature: '[object Object]',
        va: 'your_va',
        timestamp: '20191209155701',
      },
      formData: {
        name: 'Buyer',
        phone: '081999501092',
        email: 'buyer@mail.com',
        amount: '10000',
        notifyUrl: 'https://mywebsite.com',
        expired: '24',
        expiredType: 'hours',
        comments: 'Catatan',
        referenceId: '1',
        paymentMethod: 'cstore',
        paymentChannel: 'indomaret',
        'product[]': 'produk 1',
        'qty[]': '1',
        'price[]': '10000',
        'weight[]': '1',
        'width[]': '1',
        'height[]': '1',
        'length[]': '1',
        deliveryArea: '76111',
        deliveryAddress: 'Denpasar',
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
