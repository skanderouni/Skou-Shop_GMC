const express = require('express');
const router = express.Router();
const {ShowAllOrders, ShowOrdersByUser, ShowOrder, addOrder, deleteOrder, editOrder} = require('../controllers/order.controller.js')
router.get('/', ShowAllOrders);
router.get('/user/:id', ShowOrdersByUser);
router.get('/:id', ShowOrder);
router.post('/add', addOrder);
router.delete('/delete/:id', deleteOrder);
router.patch('/edit/:id', editOrder);

module.exports = router;