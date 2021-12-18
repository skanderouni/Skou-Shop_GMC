const express = require('express');
const router = express.Router();
const {
  ShowAllProduct,
  ShowProduct,
  addProduct,
  editProduct,
  deleteProduct,
  addReview,
} = require('../controllers/product.controller.js');
const upload = require('../middleware/uploadImage.js');

router.get('/products', ShowAllProduct);
router.get('/:id', ShowProduct);
router.post('/add', upload.single('image'), addProduct);
router.patch('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/review/:id', addReview);

module.exports = router;
