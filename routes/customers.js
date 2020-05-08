const express = require('express');
const {protect, authorize} = require('../middleware/auth')
const router = express.Router();
const Customer = require('../models/Customer');

router.get('/', protect, async (req, res) => {
    const customers = await Customer.find({user: req.user.id});
    res.status(200).json(customers);
})

router.get('/:id', protect, async (req, res) => {
    const customer = await Customer.findOne({_id: req.params.id});
    if(!customer){
    return res.status(404).json({message: "Customer not found"});
    }
    return res.status(200).json(customer);
})

router.post('/', protect, async (req, res) => {
    const {name} = req.body;
    
    const newCustomer = new Customer({name, user: req.user.id});
    
    const customer = await newCustomer.save();
    
    res.status(200).json(customer);
})

router.put('/:id', protect, async(req, res) => {

  const {name} = req.body;

  const customerFields = {};
  if (name) customerFields.name = name;

    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({message: 'Customer not found'});

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {$set: customerFields},
      {new: true},
    );

    res.json(customer);
})

router.delete('/:id', protect, async (req, res) => {
    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({message: 'Customer not found'});

    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({message: 'Not authorized'});
    }

    await Customer.findByIdAndRemove(req.params.id);

    res.json({message: 'Customer removed'});
})


module.exports = router;