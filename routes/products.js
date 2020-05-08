const express = require('express');
const {protect, authorize} = require('../middleware/auth')
const router= express.Router();
const Product = require('../models/Product')

router.get('/', protect, async(req, res) => {
    const products = await Product.find({user: req.user.id});
    res.status(200).json(products);
})

router.get('/:id', protect, async(req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(!product){
    return res.status(404).json({message: "Product not found"});
    }
    return res.status(200).json(product);
})

router.post('/', protect, async (req, res) => {

  const {name} = req.body;
 
    const newProduct = new Product({name, user: req.user.id});
    
    const product = await newProduct.save();

    res.status(200).json(product);
})

router.put('/:id', protect, async(req, res) => {

  const {name} = req.body;

  const productFields = {};
  if (name) productFields.name = name;

    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({message: 'Product not found'});

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {$set: productFields},
      {new: true},
    );

    res.json(product);

})

router.delete('/:id', protect, async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({message: 'Product not found'});

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({message: 'Product removed'});
})

module.exports = router;