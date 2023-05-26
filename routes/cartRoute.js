const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

const app = express();


router.get('/cart', function (req, res) {
    if (req.isAuthenticated()){
      Product.find()
        .then(products => {
          res.render('cart', { products });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      } else{
        res.redirect('/signin');
      }
    });
    
    module.exports = router;