const express = require('express');
var multer = require('multer');
const Product = require('../models/productModel');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

const router = express.Router();

const app = express();

app.use(express.static('images'));


router.get('/admin', function (req, res) {
    res.render('admin')
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
      res.redirect('/cart')
    //   res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to add product' });
    }
  });
  
module.exports = router;