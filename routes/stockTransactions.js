const express = require('express');
const router = express.Router();
const StockTransaction = require('../models/StockTransaction');
const Product = require('../models/Product');
const AuditLog = require('../models/AuditLog');

// Record a stock transaction
router.post('/', async (req, res) => {
    const { product_id, transaction_type, quantity } = req.body;

    try {
        const transaction = new StockTransaction({ product_id, transaction_type, quantity });
        await transaction.save();

        // Create an audit log entry
        const auditLog = new AuditLog({ product_id, transaction_type, quantity, user });
        await auditLog.save();

        // Update product quantity based on transaction type
        const product = await Product.findById(product_id);
        if (transaction_type === 'restock') {
            product.quantity += quantity;
        } else if (transaction_type === 'sale') {
            product.quantity -= quantity;
        }
        await product.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve all stock transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await StockTransaction.find().populate('product_id');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;