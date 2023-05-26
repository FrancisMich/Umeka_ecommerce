const express = require('express');
var multer = require('multer');
const Product = require('../models/productModel');
const methodOverride = require('method-override');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

const router = express.Router();

const app = express();

app.use(methodOverride('_method'));

app.use(express.static('images'));


router.get('/admin', function (req, res) {
  Product.find()
  .then(products => {
    res.render('admin', { products });
  })
});

router.post('/products', upload.single('image'), async function(req, res) {
    try {
      const { productName, productPrice } = req.body;
  
      const newProduct = new Product({
        productName,
        productPrice,
        productImage: req.file.filename
      });
  
      await newProduct.save();
      res.redirect('/admin')
    //   res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to add product' });
    }
  });

  router.delete('/products/:id', function (req, res) {
    const productId = req.params.id;
        Product.findByIdAndDelete(productId)
      .then(function () {
        res.redirect('/admin');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/admin');
      });
  });
  
  
module.exports = router;