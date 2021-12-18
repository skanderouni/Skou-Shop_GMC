const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.addProduct = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    image: req.file?.filename,
  });
  product
    .save()
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
exports.editProduct = (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    });
};
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(() => {
      return res.status(200).json({ message: 'Product is deleted' });
    })
    .catch((error) => {
      return res.status(error.code).json({ error: error.message });
    });
};
exports.ShowAllProduct = (req, res) => {
  Product.find({})
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};
exports.ShowProduct = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};
exports.addReview = (req, res) => {
  const id = req.params.id;
  Product.updateOne(
    { _id: id },
    {
      $addToSet: {
        reviews: [
          {
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            rating: req.body.rating,
            comment: req.body.comment,
          },
        ],
      },
    },
    function (error, result) {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
};
