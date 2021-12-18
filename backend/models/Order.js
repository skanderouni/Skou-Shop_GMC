const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  shipping: [
    {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number },
  orderedAt: { type: Date, default: Date.now() },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
});

module.exports = Order = model('Order', orderSchema);
