const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProdctSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String },
  image: { type: String },
  brand: { type: String },
  price: { type: Number, default: 0 },
  category: { type: String },
  countInStock: { type: Number, default: 0 },
  description: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [
    {
      _id: Schema.Types.ObjectId,
      title: { type: String },
      rating: { type: Number, default: 0 },
      comment: { type: String },
    },
  ],
});

module.exports = Product = model('Product', ProdctSchema);
