const Order = require('../model/order');
const Product = require('../model/product');
const Cart = require('../model/cart');
const midtransClient = require('midtrans-client');
const request = require('request');

exports.getAllOrders = async (req, res, next) => {
  const page = +req.query.page - 1 || 0;
  const itemPerPage = 8;

  try {
    const order = await Order.find({})
      .sort({ updatedAt: -1 })
      .skip(page * itemPerPage)
      .limit(itemPerPage)
      .populate('products.category')
      .populate('products.unit', '_id unit')
      .exec();

    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }

    const totalOrders = await Order.countDocuments({}).exec();
    const totalPage = Math.ceil(totalOrders / itemPerPage);

    return res.status(200).json({
      success: true,
      order,
      totalOrders: totalOrders,
      page: page + 1,
      pageSize: itemPerPage,
      totalPage: totalPage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrdersByUser = async (req, res, next) => {
  const page = +req.query.page - 1 || 0;
  const itemPerPage = 6;

  try {
    const order = await Order.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .skip(page * itemPerPage)
      .limit(itemPerPage)
      .populate('products.category')
      .populate('products.unit', '_id unit')
      .exec();
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }

    const totalProducts = await Order.countDocuments({ userId: req.user._id }).exec();
    const totalPage = Math.ceil(totalProducts / itemPerPage);

    return res.status(200).json({
      success: true,
      order,
      totalProducts: totalProducts,
      page: page + 1,
      pageSize: itemPerPage,
      totalPage: totalPage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderThisMonth = async (req, res, next) => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  try {
    const order = await Order.countDocuments({
      createdAt: {
        $gte: new Date(`${year},$${month}`),
      },
    });

    if (!order) {
      return res.status(200).json({ success: true, order: 0 });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.find({ transaction_id: id })
      .populate('products.category')
      .populate('products.unit', '_id unit');
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

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
  const { products, transaction_id, totalPrice, shipping_address } = req.body;

  try {
    for (let index = 0; index < products.length; index++) {
      await Product.findByIdAndUpdate(products[index].productId, {
        $inc: { quantity: -products[index].quantity },
      });
    }

    const userData = await Cart.findOne({ userId: req.user._id });
    const cart = userData.products;
    for (let index = 0; index < products.length; index++) {
      const updatedCart = cart.filter(
        (_cart) => _cart.productId.toString() !== products[index].productId.toString(),
      );
      userData.products = updatedCart;
      await userData.save();
    }

    const newOrder = new Order({
      userId: req.user._id,
      products,
      transaction_id,
      totalPrice,
      shipping_address,
    });

    await newOrder.save();
    return res.status(200).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayment = async (req, res, next) => {
  const { courierCost, orderItem } = req.body;
  let totalPrice = courierCost;

  for (let index = 0; index < orderItem.length; index++) {
    const productId = orderItem[index].productId;
    const product = await Product.findById({ _id: productId });
    const productPrice = product.price * orderItem[index].quantity;
    totalPrice += +productPrice;
  }
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: process.env.SERVER_KEY_MIDTRANS,
  });

  let parameter = {
    transaction_details: {
      order_id: 'order-id-node-' + Math.round(new Date().getTime() / 1000),
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
  };
  try {
    const transaction = await snap.createTransaction(parameter);
    return res.status(200).json({
      success: true,
      result: {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkPayment = async (req, res, next) => {
  let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_MIDTRANS,
    clientKey: process.env.CLIENT_KEY_MIDTRANS,
  });

  core.transaction.status(req.params.id).then((transactionStatusObject) => {
    return res.status(200).json({ success: true, transaction: transactionStatusObject });
  });
};

exports.addResi = async (req, res, next) => {
  const { resiNumber } = req.body;
  try {
    const orderItem = await Order.findOne({ transaction_id: req.params.id });

    if (!orderItem) {
      return res.status(400).json({ message: 'Tidak Bisa Mengupdate Item yang Tidak Ada' });
    }
    orderItem.resiNumber = resiNumber;
    await orderItem.save();
    return res.status(200).json({ message: 'Berhasil Menambahkan Nomer Resi' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
