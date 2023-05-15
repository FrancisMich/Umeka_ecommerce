require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const mongoose = require("./controller/dbController");
const Product = require('./models/productModel');
const passport = require('passport');
const signupRoutes = require('./routes/signupRoutes');
const signinRoutes = require('./routes/siginRoutes');
const mainRoute = require('./routes/mainRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', function (req, res) {
    res.render('main')
});

app.use(mainRoute);

app.use(signupRoutes);

app.use(signinRoutes);

app.use(adminRoute);

app.get('/cart', function (req, res) {
    Product.find()
      .then(products => {
        res.render('cart', { products });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
app.get('/truck', function (req, res) {
    res.render('truck')
});

app.get('/shop', function (req, res) {
    res.render('shop')
});

app.get('/about', function (req, res) {
    res.render('about')
});

app.get('/contact', function (req, res) {
    res.render('contact')
});

app.listen(3000, function () {
    console.log('server connected to port 3000')
});
