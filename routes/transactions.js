const express = require('express');
const {protect, authorize} = require('../middleware/auth');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', protect, async (req, res) => {
    const transactions = await Transaction.find({user: req.user.id}).populate('customer').populate('product');
    res.status(200).json(transactions);

})

router.post('/', protect, async (req, res) => {

    const {customer, product, status} = req.body;
    const newTransaction = new Transaction({customer,product,status,user: req.user.id});
    const transaction = await newTransaction.save();
    res.status(200).json(transaction);
})

module.exports = router;