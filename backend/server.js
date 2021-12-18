console.clear();

const express = require('express');
const connectDB = require('./config/connectDB');
require('dotenv').config();
var cors = require('cors');

/*********************************************************** */
const app = express();
const userRoutes = require('./router/User');
const productRoutes = require('./router/Product');
const orderRoutes = require('./router/order.route.js');

/********************************* */
connectDB();

/****************** */
app.use(express.json());
app.use(cors());
/*Router*/

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

/************************************************** */
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on= ${PORT}`)
);
