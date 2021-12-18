const Order = require('../models/Order.js');
const mongoose = require('mongoose');

exports.ShowAllOrders = (req, res) => {
  Order.find({})
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

exports.ShowOrdersByUser = (req, res) => {
  const id = req.params.id;
  Order.find({ user: id })
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

exports.ShowOrder = (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};
exports.addOrder = (req, res) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  order
    .save()
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
exports.deleteOrder = (req, res) => {
    const id = req.params.id;
    Order.findById(id)
      .then((order) => {
        if(order.isDelivered === false) {
            Order.findByIdAndRemove(id)
            .then((result) => {
              return res.status(200).json({ message: 'Order is deleted' });
            })
            .catch((error) => {
              return res.status(error.code).json({ error: error.message });
            });  
        } else {
            return res.status(400).json({message : "Order is already delivered"});
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: error });
      });

  /*Order.findByIdAndRemove(id)
    .then((result) => {
      return res.status(200).json({ message: 'Order is deleted' });
    })
    .catch((error) => {
      return res.status(error.code).json({ error: error.message });
    });*/
};

exports.editOrder = (req, res) => {
  const id = req.params.id;
  Order.findOneAndUpdate(
    { _id: id },
    { $set: { isDelivered: true, deliveredAt: Date.now() } },
    function (error, result) {
      if (error) {
        return res.status(500).json(error);
      } else {
        return res.status(200).json(result);
      }
    }
  );
};
