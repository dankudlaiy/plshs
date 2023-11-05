const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');

const productRoutes = require('./routes/product.route');
const userRoutes = require('./routes/user.route');
const userProductRoutes = require('./routes/userProduct.route');

require('dotenv').config();

require('./initDb')();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/userProduct', userProductRoutes);

app.use((req, res, next) => {
    next(createError(404, "Not found"));
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
});

module.exports = app;