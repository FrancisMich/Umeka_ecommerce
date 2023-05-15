const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
