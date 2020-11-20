const Order = require('../model/order');
const midtransClient = require('midtrans-client');
const request = require('request');

exports.getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.user._id });
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// exports.addToOrder = async (req, res, next) => {
//   const { products, totalPrice } = req.body;
//   try {
//     const newOrder = new Order({
//       userId: req.user._id,
//       products,
//       totalPrice,
//     });

//     await newOrder.save();
//     return res.status(201).json({ success: true, order: newOrder });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.getCost = async (req, res, next) => {
  const { destination, courier } = req.body;
  const weight = 1000;
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

exports.addToOrder = async (req, res, next) => {
  const { totalPrice, products } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user._id,
      totalPrice: totalPrice,
      products: products,
    });

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.SERVER_KEY_MIDTRANS,
    });

    let parameter = {
      transaction_details: {
        order_id: newOrder._id,
        gross_amount: totalPrice,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.user.name,
        email: req.user.email,
        phone: req.user.telephone,
      },
      callbacks: {
        finish: 'http://localhost:3000/keranjang',
      },
    };
    const transaction = await snap.createTransaction(parameter);
    newOrder.token = transaction.token;
    newOrder.redirect_url = transaction.redirect_url;
    await newOrder.save();
    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
