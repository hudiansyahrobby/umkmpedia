const Order = require('../model/order');
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
      .populate('category')
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

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.find({ transaction_id: id });
    if (!order) {
      return res.status(200).json({ success: true, order: [] });
    }
    console.log('ORDER', order);
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
  const { totalPrice } = req.body;
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
    callbacks: {
      finish: 'http://localhost:3000/riwayat-pembelian',
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
  console.log(`- Received check transaction status request:`, req.body);

  // [0] Setup API client and config
  let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_MIDTRANS,
    clientKey: process.env.CLIENT_KEY_MIDTRANS,
  });

  core.transaction.status(req.params.id).then((transactionStatusObject) => {
    // let orderId = transactionStatusObject.order_id;
    // let transactionStatus = transactionStatusObject.transaction_status;
    // let fraudStatus = transactionStatusObject.fraud_status;
    return res.status(200).json({ success: true, transaction: transactionStatusObject });

    // let summary = `Transaction Result. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}.<br>Raw transaction status:<pre>${JSON.stringify(
    //   transactionStatusObject,
    //   null,
    //   2,
    // )}</pre>`;

    // [5.A] Handle transaction status on your backend
    // Sample transactionStatus handling logic
    // if (transactionStatus === 'capture') {
    // if (fraudStatus === 'challenge') {
    // TODO set transaction status on your databaase to 'challenge'
    // } else if (fraudStatus === 'accept') {
    // TODO set transaction status on your databaase to 'success'
    // }
    // } else if (transactionStatus === 'settlement') {
    // TODO set transaction status on your databaase to 'success'
    // Note: Non card transaction will become 'settlement' on payment success
    // Credit card will also become 'settlement' D+1, which you can ignore
    // because most of the time 'capture' is enough to be considered as success
    // } else if (
    //   transactionStatus === 'cancel' ||
    //   transactionStatus === 'deny' ||
    //   transactionStatus === 'expire'
    // ) {
    // TODO set transaction status on your databaase to 'failure'
    // } else if (transactionStatus === 'pending') {
    // TODO set transaction status on your databaase to 'pending' / waiting payment
    // } else if (transactionStatus === 'refund') {
    // TODO set transaction status on your databaase to 'refund'
    // }
    // console.log(summary);
  });
};

exports.addResi = async (req, res, next) => {
  const { resiNumber } = req.body;
  console.log('RESI NUMBER', resiNumber);
  try {
    const orderItem = await Order.findOne({ transaction_id: req.params.id });

    if (!orderItem) {
      return res.status(400).json({ message: 'Tidak Bisa Mengupdate Item yang Tidak Ada' });
    }
    orderItem.resiNumber = resiNumber;
    console.log('ORDER ITEM', orderItem);
    await orderItem.save();
    return res.status(200).json({ message: 'Berhasil Menambahkan Nomer Resi' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
