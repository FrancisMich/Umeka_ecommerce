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
const cartRoute = require('./routes/cartRoute');
const methodOverride = require('method-override');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

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

app.use(cartRoute)

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/main');
  });
});

app.get('/truck', function (req, res) {
    res.render('truck')
});

app.get('/checkout', function (req, res) {
    res.render('checkout')
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