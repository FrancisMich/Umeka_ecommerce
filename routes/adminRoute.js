const express = require('express');
const multer = require('multer');
const Product = require('../models/productModel');

const storageEngine = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
    },
    });
    
const upload = multer({storage: storageEngine, 
    limits: { fileSize: 1000000 }});

const router = express.Router();

const app = express();

app.use(express.static('images'));


router.get('/admin', function (req, res) {
    res.render('admin')
});

router.post('/products', upload.single('image'), async function(req, res) {
    try {
      const { productName, productPrice, productImage } = req.body;
  
      const newProduct = new Product({
        productName,
        productPrice,
        productImage
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